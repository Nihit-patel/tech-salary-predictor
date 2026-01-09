# TechSalaryPredictor
This is a machine learning project, exploring tech salaries through machine learning techniques. This project uses [Stack Overflow's 2023 Developer Survey](https://www.kaggle.com/datasets/stackoverflow/stack-overflow-2023-developers-survey) data to predict the expected salary of an individual based on several criterias. It uses messy and large data that required lots of data cleaning and preparing to then use a linear regression model for prediction.

## Features
 
**Data Cleaning** | **Python, pandas**

Cleaned the messy Stack Overflow survery data that contained missing values, inconsistent formats, and multi-select categorical fields:
- Removed rows containing missing or invalid salary data.
- Removed irrelevant and redundant features.
- Handle outliers and extreme values.
- Normalized the country and coding experience fields.
- Converted the multi-select responses into formats that can be used for machine learning.

This step makes sure that the dataset can be used for statistical analysis and machine learning.

---

**Data Visualization** | **Python, pandas, matplotlib, seaborn**

Data analysis through visualization was used to understand salary distributions and relationships between compensation and key variables:
- Years of professional experience
- Education level
- Geographic location
- Employment type
- Programming languages and technologies

This step helps to uncover trends, detect anomalies, and help choose features to use.

---

**Data Preprocessing** | **Python, pandas, matplotlib**

The data is turned into numerical values to be used by machine learning models:
- Categorical variables are converted to numerical values (country, employment type, type of developer).
- Programming languages and technologies are converted from multi-select data into boolean values.
- Ordinal features are assigned ordered numerical values (age, education level, organization size).
- Salary values are filtered using interquartile ranges to reduce skew.
- Features are selected to only use important and predictable variables.
- Highly correlated feature pairs are unified (reduced multicollinearity).

This transforms raw survey responses into structured numerical inputs.

---

**Training Machine Learning Model** | **Python, pandas, sklearn**

The **Linear Regression model** from sklearn is trained to predict the annual compensation (in USD) based on the inputs.

**The target variable:**
- `ConvertedCompYearly` (annual salary in USD)

**Predictors include:**
- Years of professional coding experience
- Education level
- Country
- Employment type
- Type of developer job
- Technical knowledge required for the job (languages & technologies)

Train/Test split is used to evaluate the performance of the model. Despite the messy data and self-reported nature of the survey, the model was able to give meaningful salary trends and insights. 

---

**Performance of Machine Learning Model** | **Python, sklearn**

More than 70% of the outcomes are explained by the model, and the average error of the model is around $22 800 USD. 

**R<sup>2</sup>** : ~ 0.72

**MAE** : ~ $22,800

---

**Interactive Interface** | **Javascript, HTML/CSS**

Created an easy-to-use web page to allow users to predict their salary (In USD) using different input factors such as coding experience, education, country, organization size, work arrangement, type of developer, and programming languages, databases, cloud platforms, frameworks & libraries, tools & devops used at the workplace.

## Future Improvements
- Test different machine learning models (Random Forest, Gradient Boosting, XGBoost).
- Use different approaches to handle outliers and missing data to keep as many entries as possible.
- Add more features from the survey data.
- Create a projection into how the salary will evolve in the future using extra datasets.
- Add additional interesting metrics besides the annual salary (cost of living, quality of life)

## Setup
# To run locally:
- Install dependencies: `pip install -r backend/requirements.txt`
- Run the backend server `app.py` using `python backend/app.py`
- Run the front end server.

# Deployed Version
Available at [tech-salary-predictor.vercel.app](https://tech-salary-predictor.vercel.app/)
- Frontend is deployed using Vercel.
- Backend is deployed using Render.

## Credit
- All the data used for this project comes from the [Stack Overflow's 2023 Developer Survey](https://www.kaggle.com/datasets/stackoverflow/stack-overflow-2023-developers-survey).
- Inspired by Dataquest.
