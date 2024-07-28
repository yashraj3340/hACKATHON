from flask import Flask, jsonify
from allocation_model import run_allocation_model

app = Flask(__name__)

@app.route('/run-model', methods=['POST'])
def run_model():
    results = run_allocation_model()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
    