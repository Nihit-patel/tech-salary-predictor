from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# load the machine learning model
model = joblib.load('backend/salary_model.pkl')
model_columns = joblib.load('backend/model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    json_data = request.get_json()

    # create empty/template df
    input_df = pd.DataFrame(columns=model_columns)
    input_df.loc[0] = 0

    # fill df with the user input values
    for key, value in json_data.items():
        if key in input_df.columns:
            input_df.at[0, key] = value
            
    # Make prediction using the ml model
    prediction = model.predict(input_df)
    
    if prediction[0] < 0:
        prediction[0] = 0
    
    return jsonify({'salary': float(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000)



