from flask import Flask, jsonify
import requests
import re

# Exceptions for champion names that don't follow same formats
champion_exceptions = {
  "Bel’Veth": "Belveth",
  "Dr. Mundo": "DrMundo",
  "Kog'Maw": "KogMaw",
  "K’Sante": "KSante",
  "LeBlanc": "Leblanc",
  "Nunu & Willump": "Nunu",
  "Rek'Sai": "RekSai",
  "Renata Glasc": "Renata",
  "Wukong": "MonkeyKing",
}

# Initialize the Flask application
app = Flask(__name__)

# GET /api/scrape
@app.route('/api/scrape', methods = ['GET'])
def scrape():
  # Data Urls (League Universe, DDragon)
  main_url = 'https://universe-meeps.leagueoflegends.com/v1/en_us/champion-browse/index.json'
  versions_url = 'https://ddragon.leagueoflegends.com/api/versions.json'
  ddragon_url = 'http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json'
  
  final_data = []
  
  # Custom Function to Remove Apostraphe and Spaces from Champion Names
  def format_name(name):
    new_string = ''
    lower_next = False
    
    # Exceptions for champion names that don't follow the same format
    if name in champion_exceptions:
      return champion_exceptions[name]
  
    for i in range(len(name)):
      if name[i] == "'":
        lower_next = True
      elif lower_next:
        new_string += name[i].lower()
        lower_next = False
      elif name[i] != ' ':
        new_string += name[i]
    
    return new_string
       
  # Fetch data from versions_url to get latest version
  response = requests.get(versions_url)
  if response.status_code == 200:
    ddragon_url = f"http://ddragon.leagueoflegends.com/cdn/{response.json()[0]}/data/en_US/champion.json"
    
  # Fetch data from main_url
  response = requests.get(main_url)
  if response.status_code == 200:
    data = response.json()
    champions = data['champions'] # Array of champion objects from main_url
    
    # Fetch data from ddragon_url
    ddragon_response = requests.get(ddragon_url)
    if ddragon_response.status_code == 200:
      dd_data = ddragon_response.json()
      dd_champions = dd_data['data'] # Object of champion objects from ddragon_url
      
    for champ in champions:
      # Extract champion section-title from main_url formatted to be keys in dd_champions
      try:
        section_title = format_name(champ['section-title'])
        
        final_data.append({
          'name': champ['name'],
          'image': champ['image'],
          'faction': 'runeterra' if champ['associated-faction-slug'] == 'unaffiliated' else champ['associated-faction-slug'],
          'tags': dd_champions[section_title]['tags'],
          'resource': dd_champions[section_title]['partype'], 
        })
      except KeyError as e:
        print('KeyError', e)
        print('section_title', section_title)
      

    else:
      final_data.append({
        'name': champ['name'],
        'error': 'Failed to fetch champion specific data'
      })
      
      print('Failed to fetch champion specific data', champ['name']) # Zyra data properly fetched, but shows error because of bad data
      
    final_data.pop() # Remove final incorrect Zyra data
    
    return jsonify(final_data)
  
  else:
    return jsonify({'error': 'Failed to fetch data'}), 500
      
      
# Run Flask application
if __name__ == '__main__':
  app.run(debug=True)
  