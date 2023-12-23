from flask import Flask, jsonify
import requests

# Initialize the Flask application
app = Flask(__name__)

# GET /api/scrape
@app.route('/api/scrape', methods = ['GET'])
def scrape():
  # Data Url
  main_url = 'https://universe-meeps.leagueoflegends.com/v1/en_us/champion-browse/index.json'
  champ_base = 'https://universe-meeps.leagueoflegends.com/v1/en_us/champions'
  
  response = requests.get(main_url)
  # If response is successful, return data, otherwise return error
  if response.status_code == 200:
    data = response.json()
    champions = data['champions']
    
    # Update data to only include name, faction, and image
    updated_data = []
    for champion in champions:
      # Get champion specific data with slug from main data
      champion_url = f"{champ_base}/{champion['slug']}/index.json"
      champion_response = requests.get(champion_url)

      if champion_response.status_code == 200:
        champ_data = champion_response.json()
        
        #extract role name
        roles = champ_data['champion']['roles']
        role_name = roles[0]['name'] if roles else 'Unknown'
        
        # Add Data to updated_data array
        updated_data.append({
          'name': champion['name'],
          'faction': 'runeterra' if champion['associated-faction-slug'] == 'unaffiliated' else champion['associated-faction-slug'],
          'image': champion['image'],
          'role': role_name
        })
        
      else:
        updated_data.append({
          'name': champion['name'],
          'error': 'Failed to fetch champion specific data'
        })
        print('Failed to fetch champion specific data', champion['name'])
      
    print('this is updated data', updated_data)
    return jsonify(updated_data)
  
  else:
    return jsonify({'error': 'Failed to fetch data'}), 500


# Run Flask application
if __name__ == '__main__':
  app.run(debug=True)
  