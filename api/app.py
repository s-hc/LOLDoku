from flask import Flask, jsonify
import requests

# Initialize the Flask application
app = Flask(__name__)

# GET /api/scrape
@app.route('/api/scrape', methods = ['GET'])
def scrape():
  # Data Url
  url = 'https://universe-meeps.leagueoflegends.com/v1/en_us/champion-browse/index.json'
  response = requests.get(url)
  
  # If response is successful, return data, otherwise return error
  if response.status_code == 200:
    data = response.json()
    champions = data['champions']
    
    # Update data to only include name, faction, and image
    updated_data = [
      {
        'name': champion['name'],
        'faction': 'runeterra' if champion['associated-faction-slug'] == 'unaffiliated' else champion['associated-faction-slug'],
        'image': champion['image']
      }
      for champion in champions
    ]
    
    return jsonify(updated_data)
  else:
    return jsonify({'error': 'Failed to fetch data'}), 500


# Run Flask application
if __name__ == '__main__':
  app.run(debug=True)