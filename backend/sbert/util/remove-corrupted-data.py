import csv
import sys

def filter_csv(input_filename, output_filename):
    with open(input_filename, 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = [row for row in reader if row[2] not in ['0.4', '0.35', '0.45']]
    
    with open(output_filename, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(rows)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    filter_csv(input_filename, output_filename)
