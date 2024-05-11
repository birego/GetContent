import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';

const fetchPageContent = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la page :', error);
    throw error;
  }
};

const stripHTML = (html) => {
  const $ = cheerio.load(html);
  return $('body').text(); // Obtenez simplement le texte du corps de la page
};

const main = async () => {
    const url = 'https://github.com/birego';
    try {
      const html = await fetchPageContent(url);
      const textWithoutHTML = stripHTML(html);
      
      // Enregistrez le texte dans un fichier
      await fs.writeFile('output.txt', textWithoutHTML);
      
      console.log('Le contenu a été enregistré dans output.txt');
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

main();

