from flask import Flask, request, jsonify
import joblib
import pymongo
import pandas as pd
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["HacknDore"].db

app = Flask(__name__)

# Load the model and label encoders
model = joblib.load('/mnt/Main Drive/Codes/Hackndore/random_forest_road_model.pkl')
label_encoders = joblib.load('/mnt/Main Drive/Codes/Hackndore/label_encoders.pkl')

@app.route('/')
def home():
    return "Welcome to the Road Maintenance Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    
    collection = db['Road Log']
    data = list(collection.find())

    df = pd.DataFrame([data])

    df['Maintenance date'] = pd.to_datetime(df['Maintenance date'])
    latest_maintenance = df.loc[df.groupby('Road Id')['Maintenance date'].idxmax()]

    for column in latest_maintenance.select_dtypes(include=['object']).columns:
        if column in label_encoders:
            le = label_encoders[column]
            latest_maintenance[column] = le.transform(latest_maintenance[column])

    latest_maintenance = pd.get_dummies(latest_maintenance)
    latest_maintenance = latest_maintenance.reindex(columns=model.feature_names_in_, fill_value=0)

    predicted_interval_days = model.predict(latest_maintenance)
    
    return jsonify({
        'predicted_interval_days': predicted_interval_days
    })

if __name__ == '__main__':
    app.run(debug=True)
