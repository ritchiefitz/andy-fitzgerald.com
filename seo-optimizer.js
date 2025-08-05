#!/usr/bin/env node

/**
 * SEO Optimizer for Andy's Epic Gaming Zone
 * Applies SEO meta tags and structured data to all game pages
 */

const fs = require('fs');
const path = require('path');

// Game configurations for SEO
const games = {
  'mine-man': {
    title: 'Mine-Man - Minecraft Pac-Man Game',
    description: 'Help Steve collect diamonds while avoiding Minecraft mobs in this epic maze adventure! A fun Minecraft-themed Pac-Man spoof perfect for kids.',
    keywords: 'minecraft pacman, mine-man, steve minecraft, minecraft game, maze game, kids game, minecraft mobs'
  },
  'puzzle-path': {
    title: 'Puzzle Path - Brain-Teasing Maze Game',
    description: 'Navigate challenging mazes, collect gems, and find the exit in this brain-teasing adventure! Multiple difficulty levels and timer challenges.',
    keywords: 'puzzle game, maze game, brain teaser, puzzle path, kids puzzle, logic game, maze solver'
  },
  'snake-legends': {
    title: 'Snake Legends - Classic Snake Game with Power-ups',
    description: 'Classic snake game with power-ups and epic boss battles! Grow your snake, avoid obstacles, and become a legend in this modern twist.',
    keywords: 'snake game, classic snake, snake legends, arcade game, retro game, power-ups, boss battles'
  },
  'pocket-tanks': {
    title: 'Pocket Tanks - Turn-Based Artillery Combat',
    description: 'Epic turn-based artillery combat with destructible terrain and explosive weapons! Strategic tank battles with physics-based gameplay.',
    keywords: 'pocket tanks, artillery game, tank game, turn-based strategy, destructible terrain, physics game'
  },
  'asteroid-blaster': {
    title: 'Asteroid Blaster - Classic Space Shooter',
    description: 'Navigate through space and destroy asteroids in this classic arcade shooter! Pilot your ship through dangerous asteroid fields.',
    keywords: 'asteroid blaster, space shooter, asteroids game, classic arcade, space game, retro shooter'
  }
};

// Function to generate SEO meta tags
function generateSEOTags(gameKey, gameConfig) {
  const gameUrl = `https://andy-fitzgerald.com/games/${gameKey}.html`;
  
  return `<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  
  <!-- Primary Meta Tags -->
  <title>${gameConfig.title} | Andy's Epic Gaming Zone</title>
  <meta name='title' content='${gameConfig.title}'>
  <meta name='description' content='${gameConfig.description}'>
  <meta name='keywords' content='${gameConfig.keywords}'>
  <meta name='robots' content='index, follow'>
  <meta name='language' content='English'>
  <meta name='author' content='Andy Fitzgerald'>
  
  <!-- Open Graph / Facebook -->
  <meta property='og:type' content='website'>
  <meta property='og:url' content='${gameUrl}'>
  <meta property='og:title' content='${gameConfig.title}'>
  <meta property='og:description' content='${gameConfig.description}'>
  <meta property='og:image' content='https://andy-fitzgerald.com/images/andy_my529.png'>
  <meta property='og:site_name' content='Andy\\'s Epic Gaming Zone'>
  
  <!-- Twitter -->
  <meta property='twitter:card' content='summary_large_image'>
  <meta property='twitter:url' content='${gameUrl}'>
  <meta property='twitter:title' content='${gameConfig.title}'>
  <meta property='twitter:description' content='${gameConfig.description}'>
  <meta property='twitter:image' content='https://andy-fitzgerald.com/images/andy_my529.png'>
  
  <!-- Favicon -->
  <link rel='icon' type='image/png' href='/favicon.png'>
  <link rel='apple-touch-icon' href='/favicon.png'>
  
  <!-- Canonical URL -->
  <link rel='canonical' href='${gameUrl}'>
  
  <!-- Stylesheets -->
  <link rel='stylesheet' href='../css/styles.css'>
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "${gameConfig.title.split(' - ')[0]}",
    "description": "${gameConfig.description}",
    "url": "${gameUrl}",
    "genre": "Arcade",
    "gamePlatform": "Web Browser",
    "operatingSystem": "Any",
    "applicationCategory": "Game",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Andy Fitzgerald"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Andy's Epic Gaming Zone",
      "url": "https://andy-fitzgerald.com"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Andy's Epic Gaming Zone",
      "url": "https://andy-fitzgerald.com"
    }
  }
  </script>`;
}

// Process each game file
Object.entries(games).forEach(([gameKey, gameConfig]) => {
  const filePath = path.join(__dirname, 'public', 'games', `${gameKey}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the head section
    const headStart = content.indexOf('<head>');
    const headEnd = content.indexOf('</head>') + 7;
    
    if (headStart !== -1 && headEnd !== -1) {
      const beforeHead = content.substring(0, headStart);
      const afterHead = content.substring(headEnd);
      
      const newHead = generateSEOTags(gameKey, gameConfig);
      const newContent = beforeHead + newHead + '\n</head>' + afterHead;
      
      // Write the updated content
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Updated SEO for: ${gameKey}.html`);
    } else {
      console.log(`❌ Could not find head section in: ${gameKey}.html`);
    }
  } else {
    console.log(`❌ File not found: ${gameKey}.html`);
  }
});

console.log('\n🎯 SEO optimization complete!');
console.log('📊 All game pages now have:');
console.log('   • Comprehensive meta tags');
console.log('   • Open Graph tags for social sharing');
console.log('   • Twitter Card tags');
console.log('   • Structured data (JSON-LD)');
console.log('   • Canonical URLs');
console.log('   • Proper SEO titles and descriptions');
