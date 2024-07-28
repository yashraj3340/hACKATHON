class Maintainance:
    def __init__(self):
        self.maintainance = False

    def check_maintainance(self):
        if self.maintainance:
            return "Maintainance is required"
        else:
            return "No Maintainance required"

    def set_maintainance(self, maintainance):
        self.maintainance = maintainance

    def get_maintainance(self):
        return self.maintainance
    
    def Road(self, road_data):
        self.road_data = road_data
        