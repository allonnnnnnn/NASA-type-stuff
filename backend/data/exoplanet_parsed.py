import pandas as pd
import json

# Configuration
INPUT_FILE = "exoplanet.eu_catalog_05-10-25_00_26_32.csv"
OUTPUT_JSON = "exoplanet_cleaned.json"
OUTPUT_CSV = "exoplanet_cleaned.csv"

# Columns to keep
COLUMNS_TO_KEEP = [
    'name',
    'mass',
    'radius',
    'orbital_period',
    'star_name',
    'star_distance',
    'star_age'
]

def clean_exoplanet_data(input_file, output_json, output_csv):
    """
    Clean exoplanet data by selecting specific columns and removing rows with any empty values.
    Outputs both JSON (recommended for Firebase) and CSV formats.
    """
    
    print(f"Reading data from {input_file}...")
    
    # Read the CSV file
    df = pd.read_csv(input_file)
    print(f"Total rows in original file: {len(df)}")
    
    # Select only the columns we want
    df_filtered = df[COLUMNS_TO_KEEP].copy()
    print(f"Columns selected: {', '.join(COLUMNS_TO_KEEP)}")
    
    # Remove rows with any empty/null values
    df_clean = df_filtered.dropna()
    print(f"Rows after removing empty values: {len(df_clean)}")
    print(f"Rows removed: {len(df_filtered) - len(df_clean)}")
    
    # Reset index for clean output
    df_clean = df_clean.reset_index(drop=True)
    
    # Convert to JSON format optimized for Firebase
    # Using 'records' orientation creates a list of dictionaries
    exoplanet_list = df_clean.to_dict('records')
    
    # Create a Firebase-friendly structure with planet names as keys (optional)
    # This allows direct access by name in Firebase
    firebase_dict = {}
    for planet in exoplanet_list:
        # Use planet name as key, removing spaces and special characters
        key = planet['name'].replace(' ', '_').replace('.', '_').replace('-', '_')
        firebase_dict[key] = planet
    
    # Save as JSON (recommended for Firebase)
    print(f"\nSaving JSON to {output_json}...")
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(firebase_dict, f, indent=2, ensure_ascii=False)
    
    # Also save as CSV as backup
    print(f"Saving CSV to {output_csv}...")
    df_clean.to_csv(output_csv, index=False)
    
    # Print summary statistics
    print("\n" + "="*50)
    print("CLEANING SUMMARY")
    print("="*50)
    print(f"Original rows: {len(df)}")
    print(f"Cleaned rows: {len(df_clean)}")
    print(f"Data retention rate: {len(df_clean)/len(df)*100:.2f}%")
    print("\nSample of cleaned data:")
    print(df_clean.head())
    
    print("\n" + "="*50)
    print("OUTPUT FILES")
    print("="*50)
    print(f"✓ JSON (Firebase-ready): {output_json}")
    print(f"✓ CSV (backup): {output_csv}")
    print("\nFor Firebase, use the JSON file. Each planet is stored with its name as the key.")
    
    return df_clean

if __name__ == "__main__":
    try:
        df_cleaned = clean_exoplanet_data(INPUT_FILE, OUTPUT_JSON, OUTPUT_CSV)
        print("\n✓ Data cleaning completed successfully!")
    except FileNotFoundError:
        print(f"Error: Could not find file '{INPUT_FILE}'")
        print("Please make sure the file is in the same directory as this script.")
    except Exception as e:
        print(f"Error: {str(e)}")