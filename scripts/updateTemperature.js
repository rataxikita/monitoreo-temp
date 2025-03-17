const fs = require('fs');
const path = require('path');

function generateRandomTemperature(min = 15, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateTemperature() {
  const dbPath = path.join(__dirname, '..', 'db.json');
  
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const newTemp = generateRandomTemperature();
    
    // Actualizar temperatura actual
    data.temperature = {
      temperature: newTemp
    };
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log(`Temperatura actualizada a: ${newTemp}°C`);
  } catch (error) {
    console.error('Error actualizando temperatura:', error);
  }
}

// Actualizar temperatura cada 5 segundos
setInterval(updateTemperature, 5000);
updateTemperature(); // Primera actualización inmediata 