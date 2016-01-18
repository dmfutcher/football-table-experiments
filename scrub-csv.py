# scrub-csv.py - Extracts team/goal information from football-data.co.uk files
# See http://www.football-data.co.uk/englandm.php
# Pass each raw CSV to clean up as an argument

import csv
import sys

if __name__ == "__main__":
    for input_file in sys.argv[1:]:
        with open(input_file, newline="") as infile:
            with open(input_file.replace(".csv", "_data.csv"), "w", newline="") as outfile:
                writer = csv.writer(outfile, delimiter=",")
                reader = csv.reader(infile, delimiter=",")

                skipped_header = False
                for row in reader:
                    if not skipped_header:
                        skipped_header = True
                        continue

                    writer.writerow([row[2], row[3], row[4], row[5]])
