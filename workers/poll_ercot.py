import os
import requests
from datetime import datetime
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Supabase credentials not found in environment.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_ercot_grid_data():
    # Example logic: in production, this would parse the ERCOT EIA/JSON feeds
    # or scrape their real-time grid conditions page.
    # For now, we mock the transformation of real-time load data.
    
    # [Extract]
    # url = "https://www.ercot.com/api/1/sysload"
    # response = requests.get(url)
    # data = response.json()
    
    # Mocking extracted ERCOT Data
    data = {
        "current_load": 65432, # MW
        "capacity": 85000, # MW
        "timestamp": datetime.utcnow().isoformat()
    }
    return data

def calculate_water_stress_index(load_mw, capacity_mw):
    # [Transform]
    # Simple heuristic: As load approaches capacity, thermal plant water cooling 
    # requirements scale non-linearly.
    utilization = load_mw / capacity_mw
    base_stress = utilization * 100
    
    # Apply high-utilization penalty multiplier
    if utilization > 0.85:
        base_stress *= 1.4
        
    return round(base_stress, 2)

def run_etl_pipeline():
    print(f"[{datetime.utcnow().isoformat()}] Starting ERCOT ETL Pipeline...")
    
    try:
        raw_data = fetch_ercot_grid_data()
        
        load_mw = raw_data["current_load"]
        capacity_mw = raw_data["capacity"]
        stress_idx = calculate_water_stress_index(load_mw, capacity_mw)
        
        # [Load]
        payload = {
            "region": "ERCOT",
            "timestamp": raw_data["timestamp"],
            "current_load_mw": load_mw,
            "capacity_mw": capacity_mw,
            "water_stress_index": stress_idx
        }
        
        response = supabase.table("telemetry_snapshots").insert(payload).execute()
        print(f"Successfully loaded telemetry snapshot: {response.data}")
        
    except Exception as e:
        print(f"ETL Pipeline Error: {e}")

if __name__ == "__main__":
    run_etl_pipeline()
