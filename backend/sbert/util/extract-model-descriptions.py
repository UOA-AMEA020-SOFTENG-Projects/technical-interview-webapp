import json
from openpyxl import Workbook

# Load JSON data from a file
with open('data.json', 'r') as file:
    data = json.load(file)

# Create a new Excel workbook and select the active worksheet
wb = Workbook()
ws = wb.active
ws.title = "Descriptions"

# Iterate over the JSON data and extract the modelDescription value
for entry in data:
    description = entry.get("modelDescription", "")
    # Remove the quotation marks from the description
    description = description.replace('"', '').replace("'", "")
    # Append the description to the Excel worksheet
    ws.append([description])

# Save the workbook to an Excel file
wb.save("descriptions.xlsx")

print("Descriptions saved to 'descriptions.xlsx'")
