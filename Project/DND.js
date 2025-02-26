document.addEventListener("DOMContentLoaded", function () {
    const levelInput = document.getElementById("Level");
    const classSelect = document.getElementById("class");
    const raceSelect = document.getElementById("Race");
  
    levelInput.addEventListener("input", function () {
      validateInput();
      handleClassChange();
      displayClassFeatures();      // update class features
      displaySubclassFeatures();   // update subclass features
    });
    classSelect.addEventListener("change", function () {
      handleClassChange();
      displayClassFeatures();      // update class features
      displaySubclassFeatures();   // update subclass features
    });
    raceSelect.addEventListener("change", function () {
      handleRaceChange();
      displayRaceData();
    });
  
    // Attach listeners for ability scores and initialize modifiers
    ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].forEach(stat => {
      const inputElem = document.getElementById(stat);
      if (inputElem) {
        inputElem.addEventListener("input", function () {
          updateModifier(stat);
        });
        updateModifier(stat);
      }
    });
    // Attach listener to every subclass select element
    document.querySelectorAll('select[name="subclass"]').forEach(selectElem => {
      selectElem.addEventListener("change", displaySubclassFeatures);
    });
  });
  
  function handleRaceChange() {
    const raceValue = document.getElementById("Race").value;
    if (!raceValue) return;
  
    const raceBonuses = raceData[raceValue]?.abilityScores || {};
    for (const stat in raceBonuses) {
      const inputElem = document.getElementById(stat);
      if (inputElem) {
        let currentScore = parseInt(inputElem.value, 10) || 0;
        inputElem.value = currentScore + raceBonuses[stat];
        updateModifier(stat);
      }
    }
  }
  
  function handleClassChange() {
    const classValue = document.getElementById('class').value;
    const levelValue = parseInt(document.getElementById('Level').value);
    
    // Hide all subclass selections first
    document.querySelectorAll('[id$="subclass"]').forEach(div => div.setAttribute('hidden', 'true'));
  
    if (!classValue) return; // Stop if no class is selected
  
    const subclassLevels = {
      "Art": 3, "Barb": 3, "bard": 3, "Cleric": 1, "druid": 2,
      "fighter": 3, "monk": 3, "paladin": 3, "ranger": 3, "rogue": 3,
      "Sorcerer": 1, "Warlock": 1, "Wizard": 2
    };
    const subclassFeatures = {
        "Art": {
          "Alchemist": {
            3: "Alchemical Savant",
            5: "Experimental Elixir",
            9: "Restorative Reagents"
          },
          "Armorer": {
            3: "Arcane Armor",
            5: "Armor Modifications",
            9: "Armor Mastery"
          },
          "Artillerist": {
            3: "Eldritch Cannon",
            5: "Arcane Firepower",
            9: "Explosive Impact"
          },
          "Battle": {
            3: "Steel Defender",
            5: "Battle Ready",
            9: "Defender's Strike"
          }
        },
        "Barb": {
          "Ancestral": {
            3: "Ancestral Protectors",
            6: "Spirit Shield",
            10: "Vengeful Ancestry"
          },
          "Battlerager": {
            3: "Reckless Assault",
            6: "Berserker Rage",
            10: "Unyielding Fury"
          },
          "Beast": {
            3: "Primal Bond",
            6: "Wild Empathy",
            10: "Savage Transformation"
          },
          "Berserker": {
            3: "Frenzied Rage",
            6: "Mindless Rage",
            10: "Berserk Resilience"
          },
          "Giant": {
            3: "Giant's Might",
            6: "Tremor Strike",
            10: "Mountain's Endurance"
          },
          "Storm": {
            3: "Tempestuous Fury",
            6: "Lightning Reflexes",
            10: "Stormbringer"
          },
          "Totem": {
            3: "Spirit Animal Bond",
            6: "Totemic Attunement",
            10: "Guardian Totem"
          },
          "Wild": {
            3: "Wild Magic Surge",
            6: "Chaotic Strike",
            10: "Primal Chaos"
          },
          "Zealot": {
            3: "Fanatical Devotion",
            6: "Martyr's Fury",
            10: "Divine Zeal"
          }
        },
        "Bard": {
          "Creation": {
            3: "Inspiring Creations",
            6: "Artistic Flourish",
            10: "Creative Mastery"
          },
          "Eloquence": {
            3: "Silver Tongue",
            6: "Persuasive Performance",
            10: "Orator's Command"
          },
          "Glamour": {
            3: "Mantle of Inspiration",
            6: "Enthralling Presence",
            10: "Fey Majesty"
          },
          "Lore": {
            3: "Cutting Words",
            6: "Bardic Lore",
            10: "Secrets Unveiled"
          },
          "Spirits": {
            3: "Ghostly Guidance",
            6: "Spirit Summons",
            10: "Phantasmal Strike"
          },
          "Valor": {
            3: "Battle Magic",
            6: "Inspiring Courage",
            10: "Heroic Deeds"
          },
          "Whispers": {
            3: "Psychic Blades",
            6: "Secrets of the Shadows",
            10: "Mind Piercer"
          }
        },
        "Cleric": {
          "Arcana": {
            1: "Arcane Initiate",
            2: "Spell Secrets",
            5: "Mystic Conduit"
          },
          "Death": {
            1: "Touch of Death",
            2: "Grim Harvest",
            5: "Reaper’s Call"
          },
          "Forge": {
            1: "Blessed Artisan",
            2: "Heat of the Forge",
            5: "Master Smith"
          },
          "Grave": {
            1: "Circle of Mortality",
            2: "Sentinel at Death’s Door",
            5: "Grave Touch"
          },
          "Knowledge": {
            1: "Blessing of Knowledge",
            2: "Insightful Divination",
            5: "Sage’s Wisdom"
          },
          "Life": {
            1: "Disciple of Life",
            2: "Healing Touch",
            5: "Beacon of Life"
          },
          "Nature": {
            1: "Nature’s Wrath",
            2: "Charm of the Wild",
            5: "Elemental Bond"
          },
          "Order": {
            1: "Commanding Presence",
            2: "Lawful Judgment",
            5: "Order's Authority"
          },
          "Peace": {
            1: "Aura of Calm",
            2: "Soothing Touch",
            5: "Peaceful Respite"
          },
          "Tempest": {
            1: "Wrath of the Storm",
            2: "Thunderous Rebuke",
            5: "Tempest Fury"
          },
          "Trickery": {
            1: "Cloak of Shadows",
            2: "Divine Deception",
            5: "Mischievous Strike"
          },
          "Twilight": {
            1: "Twilight Sanctuary",
            2: "Dusk’s Embrace",
            5: "Moonlit Vigil"
          },
          "War": {
            1: "War Priest",
            2: "Divine Strike",
            5: "Battle Hymn"
          }
        },
        "Druid": {
          "Dreams": {
            2: "Dreamweaver",
            4: "Lucid Vision",
            8: "Phantasmal Form"
          },
          "Land": {
            2: "Bonus Cantrip",
            4: "Natural Recovery",
            8: "Land's Stride"
          },
          "Moon": {
            2: "Combat Wild Shape",
            4: "Moonbeam Mastery",
            8: "Lunar Strike"
          },
          "Shepherd": {
            2: "Spirit Totem",
            4: "Mighty Summons",
            8: "Guardian Spirits"
          },
          "Spores": {
            2: "Symbiotic Entity",
            4: "Fungal Infestation",
            8: "Mushroom Cloud"
          },
          "Stars": {
            2: "Star Map",
            4: "Cosmic Omen",
            8: "Astral Form"
          },
          "Wildfire": {
            2: "Wildfire Spirit",
            4: "Fiery Rebirth",
            8: "Blazing Trail"
          }
        },
        "Fighter": {
          "Archer": {
            3: "Sharpshooter",
            7: "Eagle Eye",
            11: "Deadly Precision"
          },
          "Banneret": {
            3: "Rallying Cry",
            7: "Battle Standard",
            11: "Inspiring Presence"
          },
          "Battle-Master": {
            3: "Combat Superiority",
            7: "Maneuvering Attack",
            11: "Precision Strike"
          },
          "Cavalier": {
            3: "Mounted Combatant",
            7: "Hold the Line",
            11: "Vigilant Defender"
          },
          "Champion": {
            3: "Improved Critical",
            7: "Remarkable Athlete",
            11: "Survivor"
          },
          "Echo": {
            3: "Echo Avatar",
            7: "Unleash Incarnation",
            11: "Shadow Martyr"
          },
          "Eldritch": {
            3: "Spellcasting",
            7: "War Magic",
            11: "Arcane Strike"
          },
          "psi": {
            3: "Psionic Strike",
            7: "Telekinetic Charge",
            11: "Mind Over Matter"
          },
          "Rune": {
            3: "Rune Carver",
            7: "Runic Shield",
            11: "Runic Mastery"
          },
          "Samurai": {
            3: "Fighting Spirit",
            7: "Elegant Courtier",
            11: "Rapid Strike"
          }
        },
        "Monk": {
          "Mercy": {
            3: "Hand of Healing",
            7: "Soothing Touch",
            11: "Healing Aura"
          },
          "Dragons": {
            3: "Dragon's Breath",
            7: "Scaled Defense",
            11: "Dragon's Roar"
          },
          "Astrals": {
            3: "Astral Projection",
            7: "Celestial Strike",
            11: "Cosmic Balance"
          },
          "Druken": {
            3: "Drunken Mastery",
            7: "Tipsy Movement",
            11: "Unsteady Assault"
          },
          "Four": {
            3: "Elemental Fury",
            7: "Four Elements",
            11: "Elemental Mastery"
          },
          "Kensei": {
            3: "Weapon Disciple",
            7: "Path of the Kensei",
            11: "Sharpen the Blade"
          },
          "Long": {
            3: "Path of Longevity",
            7: "Enduring Spirit",
            11: "Timeless Technique"
          },
          "Open": {
            3: "Open Hand Technique",
            7: "Flurry of Blows",
            11: "Master of Balance"
          },
          "Shadow": {
            3: "Shadow Arts",
            7: "Cloak of Shadows",
            11: "Way of Shadow"
          },
          "Sun": {
            3: "Radiant Fist",
            7: "Solar Flare",
            11: "Sunlight Stride"
          }
        },
        "Paladin": {
          "Ancients": {
            3: "Aura of Warding",
            7: "Ancient Blessing",
            11: "Nature's Vigor"
          },
          "Conquest": {
            3: "Conquering Presence",
            7: "Inspiring Conquest",
            11: "Unyielding Dominance"
          },
          "Crown": {
            3: "Royal Decree",
            7: "Crown of Command",
            11: "Sovereign's Might"
          },
          "Devotion": {
            3: "Sacred Weapon",
            7: "Aura of Devotion",
            11: "Divine Retribution"
          },
          "Glory": {
            3: "Glorious Charge",
            7: "Inspiring Glory",
            11: "Hero's Legacy"
          },
          "Redemption": {
            3: "Emissary of Peace",
            7: "Rebuke the Violent",
            11: "Redemptive Strike"
          },
          "Vengeance": {
            3: "Vow of Enmity",
            7: "Relentless Pursuit",
            11: "Avenging Angel"
          },
          "Watchers": {
            3: "Watcher's Eye",
            7: "Guardian Vigil",
            11: "Protective Ward"
          },
          "Breaker": {
            3: "Oathbreaker's Mark",
            7: "Shattered Oath",
            11: "Dominion of Despair"
          }
        },
        "Ranger": {
          "Beast": {
            3: "Companion Bond",
            7: "Primal Companion",
            11: "Wild Unity"
          },
          "Drake": {
            3: "Drakebond",
            7: "Draconic Roar",
            11: "Scales of the Drake"
          },
          "Fey": {
            3: "Fey Wanderer",
            7: "Enchanted Step",
            11: "Fey Magic"
          },
          "Gloom": {
            3: "Dread Ambusher",
            7: "Shadow Stalker",
            11: "Gloom Stride"
          },
          "Horizon": {
            3: "Horizon Walker",
            7: "Planar Binding",
            11: "Ethereal Step"
          },
          "Hunter": {
            3: "Hunter's Prey",
            7: "Defensive Tactics",
            11: "Multiattack"
          },
          "Monster": {
            3: "Slayer's Instinct",
            7: "Beast Bane",
            11: "Monstrous Might"
          },
          "Swarm": {
            3: "Swarmkeeper Bond",
            7: "Swarming Fury",
            11: "Insect Plague"
          }
        },
        "Rogue": {
          "Trickster": {
            3: "Fey Presence",
            7: "Cunning Action",
            11: "Misdirection"
          },
          "Assassin": {
            3: "Assassinate",
            7: "Infiltration Expertise",
            11: "Death Strike"
          },
          "Inquisitive": {
            3: "Ear for Deceit",
            7: "Eye for Detail",
            11: "Instinctive Insight"
          },
          "Mastermind": {
            3: "Master of Intrigue",
            7: "Insightful Manipulator",
            11: "Schemer's Gambit"
          },
          "Phantom": {
            3: "Whispers of the Dead",
            7: "Wails from Beyond",
            11: "Ghostly Shroud"
          },
          "Scout": {
            3: "Skirmisher",
            7: "Survival Instinct",
            11: "Ambush Tactics"
          },
          "Soulknife": {
            3: "Psychic Blade",
            7: "Telepathic Link",
            11: "Mind Strike"
          },
          "Swashbuckler": {
            3: "Fancy Footwork",
            7: "Rakish Audacity",
            11: "Panache"
          },
          "Thief": {
            3: "Fast Hands",
            7: "Second-Story Work",
            11: "Thief's Reflexes"
          }
        },
        "Sorcerer": {
          "Aberrant": {
            3: "Psionic Spells",
            7: "Warped Magic",
            11: "Mind Bender"
          },
          "Clockwork": {
            3: "Tinker’s Magic",
            7: "Balanced Casting",
            11: "Precision Timing"
          },
          "Draconic": {
            3: "Dragon Ancestor",
            7: "Elemental Affinity",
            11: "Dragon Wings"
          },
          "Divine": {
            3: "Divine Magic",
            7: "Empowered Spells",
            11: "Celestial Soul"
          },
          "Lunar": {
            3: "Lunar Magic",
            7: "Moonlit Spellcasting",
            11: "Celestial Alignment"
          },
          "Shadow": {
            3: "Shadow Magic",
            7: "Strength of the Night",
            11: "Umbral Form"
          },
          "Sorcery": {
            3: "Wild Magic Surge",
            7: "Spell Bombardment",
            11: "Chaos Mastery"
          },
          "wild-magic": {
            3: "Unpredictable Magic",
            7: "Surge Control",
            11: "Wild Mastery"
          }
        },
        "Warlock": {
          "Archfey": {
            3: "Fey Presence",
            7: "Misty Escape",
            11: "Beguiling Defenses"
          },
          "Celestial": {
            3: "Healing Light",
            7: "Radiant Soul",
            11: "Celestial Fire"
          },
          "Fathomless": {
            3: "Tentacle of the Deeps",
            7: "Grasp of the Deep",
            11: "Oceanic Majesty"
          },
          "Fiend": {
            3: "Dark One's Blessing",
            7: "Fiendish Resilience",
            11: "Hurl Through Hell"
          },
          "Genie": {
            3: "Elemental Gift",
            7: "Genie's Wrath",
            11: "Wishful Power"
          },
          "Great": {
            3: "Eldritch Insight",
            7: "Ancient Knowledge",
            11: "Old One's Dominance"
          },
          "Hexblade": {
            3: "Hex Warrior",
            7: "Curse Bringer",
            11: "Accursed Specter"
          },
          "Undead": {
            3: "Form of Dread",
            7: "Grave Touched",
            11: "Frightful Presence"
          },
          "Undying": {
            3: "Defy Death",
            7: "Undying Fortitude",
            11: "Immortal Servitude"
          }
        },
        "Wizard": {
          "Abjuration": {
            3: "Arcane Ward",
            7: "Projected Ward",
            11: "Improved Abjuration"
          },
          "Bladesinging": {
            3: "Bladesong",
            7: "Extra Attack",
            11: "Song of Victory"
          },
          "Chronurgy": {
            3: "Chronal Shift",
            7: "Temporal Anchor",
            11: "Time Dilation"
          },
          "Conjuration": {
            3: "Minor Conjuration",
            7: "Focused Conjuration",
            11: "Major Conjuration"
          },
          "Divination": {
            3: "Portent",
            7: "Expert Divination",
            11: "Greater Portent"
          },
          "Enchantment": {
            3: "Hypnotic Gaze",
            7: "Instinctive Charm",
            11: "Split Enchantment"
          },
          "Evocation": {
            3: "Evocation Savant",
            7: "Sculpt Spells",
            11: "Potent Cantrip"
          },
          "Graviturgy": {
            3: "Gravitational Pull",
            7: "Adjust Density",
            11: "Gravity Well"
          },
          "Illusion": {
            3: "Minor Illusion",
            7: "Illusory Self",
            11: "Illusory Reality"
          },
          "Necromancy": {
            3: "Grim Harvest",
            7: "Undead Thralls",
            11: "Inured to Death"
          },
          "Scribes": {
            3: "Magical Tinkering",
            7: "Book of Shadows",
            11: "Arcane Codex"
          },
          "Transmutation": {
            3: "Minor Transmutation",
            7: "Transmuter's Stone",
            11: "Master Transmuter"
          },
          "war-Magic": {
            3: "Arcane Deflection",
            7: "Power Surge",
            11: "Spell Shield"
          }
        }
      };      
    // Object mapping class values to their subclass div IDs
    const classMap = {
        "Art": "Asubclass",
        "Barb": "Barbsubclass",
        "Bard": "Bardsubclass",
        "Cleric": "Clericsubclass",
        "Druid": "Druidsubclass",
        "Fighter": "Fightsubclass",
        "Monk": "Msubclass",
        "Paladin": "Psubclass",
        "Ranger": "Rasubclass",
        "Rogue": "Rosubclass",
        "Sorcerer": "Sorsubclass",
        "Warlock": "Warsubclass",
        "Wizard": "Wsubclass"
    };
  
    // Show subclass selection only if level is 3 or higher
    if (levelValue >= subclassLevels[classValue] && classMap[classValue]) {
        document.getElementById(classMap[classValue]).removeAttribute("hidden");
    }
  
    // Display ability scores based on class/race combination

  }
  
const classAbilities = {
  "Art": { 
      1: "Magical Tinkering", 2: "Infuse Item", 3: "Artificer Specialist", 5: "Extra Attack", 6: "Tool Expertise", 9: "Armor Modifications", 
      11: "Spell-Storing Item", 15: "Soul of Artifice" 
  },
  "Barb": { 
      1: "Rage, Unarmored Defense", 2: "Reckless Attack, Danger Sense", 3: "Primal Path", 5: "Extra Attack, Fast Movement", 
      6: "Path Feature", 9: "Brutal Critical (1 Die)", 11: "Relentless Rage", 15: "Persistent Rage", 20: "Primal Champion" 
  },
  "Bard": { 
      1: "Bardic Inspiration", 2: "Jack of All Trades, Song of Rest",  3: "Bard College", 6: "Countercharm",  10: "Magical Secrets", 
      14: "Superior Inspiration", 18: "More Magical Secrets", 20: "Superior Bardic Inspiration" 
  },
  "Cleric": { 
      1: "Spellcasting, Divine Domain",  2: "Channel Divinity", 5: "Destroy Undead",  10: "Divine Intervention", 17: "Greater Divine Intervention" 
  },
  "Druid": { 
      1: "Druidic, Spellcasting",  2: "Wild Shape, Druid Circle",  4: "Wild Shape Improvement",  10: "Elemental Wild Shape", 
      18: "Timeless Body, Beast Spells",  20: "Archdruid" 
  },
  "Fighter": { 
      1: "Fighting Style, Second Wind",  2: "Action Surge",  3: "Martial Archetype",  5: "Extra Attack", 
      9: "Indomitable", 11: "Extra Attack (2)", 20: "Extra Attack (3)" 
  },
  "Monk": { 
      1: "Unarmored Defense, Martial Arts",  2: "Ki, Unarmored Movement",  3: "Monastic Tradition", 
      5: "Extra Attack, Stunning Strike",  6: "Ki Feature",  10: "Purity of Body",  18: "Empty Body",  20: "Perfect Self" 
  },
  "Paladin": { 
      1: "Divine Sense, Lay on Hands", 2: "Fighting Style, Spellcasting, Divine Smite",  3: "Sacred Oath",  6: "Aura of Protection", 
      11: "Improved Divine Smite", 18: "Aura Improvement", 20: "Oath Feature" 
  },
  "Ranger": { 
      1: "Favored Enemy, Natural Explorer", 2: "Fighting Style, Spellcasting", 3: "Ranger Archetype", 5: "Extra Attack", 10: "Hide in Plain Sight", 
      14: "Vanish", 18: "Feral Senses", 20: "Foe Slayer" 
  },
  "Rogue": { 
      1: "Sneak Attack, Expertise", 2: "Cunning Action", 3: "Roguish Archetype", 
      5: "Uncanny Dodge", 7: "Evasion", 11: "Reliable Talent", 14: "Blindsense",  15: "Slippery Mind",  20: "Stroke of Luck" 
  },
  "Sorcerer": { 
      1: "Spellcasting, Sorcerous Origin",  2: "Font of Magic", 3: "Metamagic", 6: "Origin Feature", 10: "Metamagic Improvement", 
      14: "Origin Feature", 20: "Sorcerous Restoration" 
  },
  "Warlock": { 
      1: "Otherworldly Patron, Pact Magic", 2: "Eldritch Invocations", 3: "Pact Boon", 
      6: "Patron Feature", 10: "Patron Feature", 14: "Patron Feature", 20: "Eldritch Master" 
  },
  "Wizard": { 
      1: "Spellcasting, Arcane Recovery", 2: "Arcane Tradition", 6: "Tradition Feature", 
      10: "Tradition Feature", 18: "Spell Mastery", 20: "Signature Spell" 
  }
};

  const raceData = {
    "Dragonborn": {
        "abilityScores": { "Strength": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Draconic",
            "Abilities": ["Breath Weapon", "Damage Resistance"]
        }
    },
    "Dwarf": {
        "abilityScores": { "Constitution": 2 },
        "traits": {
            "Speed": "25 feet",
            "Size": "Medium",
            "Languages": "Common, Dwarvish",
            "Abilities": ["Darkvision", "Dwarven Resilience", "Tool Proficiency"]
        }
    },
    "Elf": {
        "abilityScores": { "Dexterity": 2 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish",
            "Abilities": ["Darkvision", "Keen Senses", "Fey Ancestry"]
        }
    },
    "Gnome": {
        "abilityScores": { "Intelligence": 2 },
        "traits": {
            "Speed": "25 feet",
            "Size": "Small",
            "Languages": "Common, Gnomish",
            "Abilities": ["Darkvision", "Gnome Cunning"]
        }
    },
    "Half-Elf": {
        "abilityScores": { "Charisma": 2, "Dexterity": 1, "Constitution": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish, and one other language",
            "Abilities": ["Darkvision", "Fey Ancestry", "Skill Versatility"]
        }
    },
    "Half-Orc": {
        "abilityScores": { "Strength": 2, "Constitution": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Orc",
            "Abilities": ["Darkvision", "Relentless Endurance", "Savage Attacks"]
        }
    },
    "Halfling": {
        "abilityScores": { "Dexterity": 2 },
        "traits": {
            "Speed": "25 feet",
            "Size": "Small",
            "Languages": "Common, Halfling",
            "Abilities": ["Lucky", "Brave", "Halfling Nimbleness"]
        }
    },
    "Human": {
        "abilityScores": { "All": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, one additional language",
            "Abilities": ["None"]
        }
    },
    "Tiefling": {
        "abilityScores": { "Charisma": 2, "Intelligence": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Infernal",
            "Abilities": ["Darkvision", "Hellish Resistance", "Infernal Legacy"]
        }
    },
    "Aarakocra": {
        "abilityScores": { "Dexterity": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "50 feet",
            "Size": "Medium",
            "Languages": "Common, Aarakocra",
            "Abilities": ["Flight", "Talons"]
        }
    },
    "Aasimar": {
        "abilityScores": { "Charisma": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Celestial",
            "Abilities": ["Darkvision", "Healing Hands", "Celestial Resistance"]
        }
    },
    "Changeling": {
        "abilityScores": { "Charisma": 2, "Dexterity": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, one additional language",
            "Abilities": ["Shapechanger"]
        }
    },
    "Deep Gnome": {
        "abilityScores": { "Dexterity": 1, "Constitution": 1 },
        "traits": {
            "Speed": "25 feet",
            "Size": "Small",
            "Languages": "Common, Gnomish, Undercommon",
            "Abilities": ["Darkvision", "Gnome Cunning", "Spellcasting"]
        }
    },
    "Duergar": {
        "abilityScores": { "Constitution": 2, "Strength": 1 },
        "traits": {
            "Speed": "25 feet",
            "Size": "Medium",
            "Languages": "Common, Dwarvish, Undercommon",
            "Abilities": ["Darkvision", "Duergar Resilience", "Enlarge"]
        }
    },
    "Eladrin": {
        "abilityScores": { "Dexterity": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish",
            "Abilities": ["Fey Step", "Keen Senses"]
        }
    },
    "Fairy": {
        "abilityScores": { "Dexterity": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Tiny",
            "Languages": "Common, Sylvan",
            "Abilities": ["Fairy Magic", "Fly"]
        }
    },
    "Firbolg": {
        "abilityScores": { "Strength": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish, Giant",
            "Abilities": ["Firbolg Magic", "Hidden Step"]
        }
    },
    "GenasiA": {
        "abilityScores": { "Constitution": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Primordial",
            "Abilities": ["Unending Breath", "Air Form"]
        }
    },
    "GenasiE": {
        "abilityScores": { "Constitution": 2, "Strength": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Primordial",
            "Abilities": ["Earth Walk", "Merge with Stone"]
        }
    },
    "GenasiF": {
        "abilityScores": { "Constitution": 2, "Intelligence": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Primordial",
            "Abilities": ["Fire Resistance", "Fire Bolt"]
        }
    },
    "GenasiW": {
        "abilityScores": { "Constitution": 2, "Dexterity": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Primordial",
            "Abilities": ["Water Breathing", "Shape Water"]
        }
    },
    "Githy": {
        "abilityScores": { "Intelligence": 2, "Strength": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Githyanki",
            "Abilities": ["Martial Prodigy", "Psionics"]
        }
    },
    "Githz": {
        "abilityScores": { "Intelligence": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Githzerai",
            "Abilities": ["Psionics", "Unarmored Defense"]
        }
    },
    "Goliath": {
        "abilityScores": { "Strength": 2, "Constitution": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Large",
            "Languages": "Common, Giant",
            "Abilities": ["Mountain Born", "Powerful Build"]
        }
    },
    "Harengon": {
        "abilityScores": { "Dexterity": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "40 feet",
            "Size": "Medium",
            "Languages": "Common, Halfling",
            "Abilities": ["Rabbit Hop", "Lucky Footed"]
        }
    },
    "Kenku": {
        "abilityScores": { "Dexterity": 2, "Intelligence": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Kenku",
            "Abilities": ["Mimicry", "Kenku Recall"]
        }
    },
    "Locathah": {
        "abilityScores": { "Dexterity": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Locathah",
            "Abilities": ["Swim", "Amphibious"]
        }
    },
    "Owlin": {
        "abilityScores": { "Dexterity": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Owlin",
            "Abilities": ["Flight", "Silent Feather"]
        }
    },
    "Satyr": {
        "abilityScores": { "Charisma": 2, "Dexterity": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Sylvan",
            "Abilities": ["Fey Charm", "Mirthful Leaps", "Ram"]
        }
    },
    "Sea Elf": {
        "abilityScores": { "Dexterity": 2, "Constitution": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish, Aquan",
            "Abilities": ["Darkvision", "Sea Elf Training", "Swim"]
        }
    },
    "Shadar-Kai": {
        "abilityScores": { "Dexterity": 2, "Constitution": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish",
            "Abilities": ["Shadow Step", "Necrotic Resistance"]
        }
    },
    "Tabaxi": {
        "abilityScores": { "Dexterity": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Elvish, Tabaxi",
            "Abilities": ["Feline Agility", "Cat's Claws", "Cat's Talent"]
        }
    },
    "Tortle": {
        "abilityScores": { "Strength": 2, "Wisdom": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Aquan",
            "Abilities": ["Natural Armor", "Shell Defense", "Swim"]
        }
    },
    "Triton": {
        "abilityScores": { "Strength": 1, "Constitution": 2, "Charisma": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Medium",
            "Languages": "Common, Primordial",
            "Abilities": ["Control Water", "Darkvision", "Merman's Resistance"]
        }
    },
    "Verdan": {
        "abilityScores": { "Charisma": 2, "Intelligence": 1 },
        "traits": {
            "Speed": "30 feet",
            "Size": "Small",
            "Languages": "Common, Verdan",
            "Abilities": ["Curiosity", "Verdant Resilience", "Speak with Verdan"]
        }
    }
}
function displayRaceData() {
    const raceValue = document.getElementById("Race").value;
    const raceInfo = raceData[raceValue];
    if (!raceInfo) {
      console.error("Race not found");
      return;
    }
    const { Speed, Size, Languages, Abilities } = raceInfo.traits;
  document.getElementById("speedDisplay").textContent = `${Speed}`;
  document.getElementById("sizeDisplay").textContent = `${Size}`;
  document.getElementById("languagesDisplay").textContent = `${Languages}`;
  // Join abilities array into a comma-separated string
  document.getElementById("raceAbilitiesDisplay").textContent = `${Abilities.join(", ")}`;
}
function displayAbilities() {
  const classValue = document.getElementById('class').value;
  const raceValue = document.getElementById('Race').value;
  const levelValue = parseInt(document.getElementById('Level').value, 10);
  const abilityList = document.getElementById('abilities');

  abilityList.innerHTML = ""; // Clear previous abilities

  let allAbilities = [];

  // Add class abilities
  if (classValue in classAbilities) {
      for (let level in classAbilities[classValue]) {
          if (levelValue >= level) {
              allAbilities.push(`Level ${level}: ${classAbilities[classValue][level]}`);
          }
      }
  }


  // Add race abilities
  /*
  if (raceValue in raceAbilities) {
      for (let level in raceAbilities[raceValue]) {
          if (levelValue >= level) {
              allAbilities.push(`Level ${level}: ${raceAbilities[raceValue][level]}`);
          }
      }
  }
      */

  // Display abilities as a list
  let list = document.createElement("ul");
  allAbilities.forEach(ability => {
      let listItem = document.createElement("li");
      listItem.textContent = ability;
      list.appendChild(listItem);
  });
  abilityList.appendChild(list);
}

// Ensures level is within 1-20
function validateInput() {
  const input = document.getElementById('Level');
  let value = parseInt(input.value);

  if (value < 1) {
      input.value = 1;
  } else if (value > 20) {
      input.value = 20;
  }
}
// Function to Update Ability Score Modifiers
// Function to calculate and update the modifier for each ability score
function updateModifier(ability) {
    const inputElem = document.getElementById(ability);
    const score = parseInt(inputElem.value, 10) || 0;
    const modifier = Math.floor((score - 10) / 2);
    const modElem = document.getElementById(ability + "Modifier");
    if (modElem) {
      modElem.textContent = `Modifier: ${modifier >= 0 ? "+" + modifier : modifier}`;
    }
  }
  

// Add event listeners to all ability score inputs
document.getElementById("Strength").addEventListener("input", function() {
    updateModifier("Strength");
});
document.getElementById("Dexterity").addEventListener("input", function() {
    updateModifier("Dexterity");
});
document.getElementById("Constitution").addEventListener("input", function() {
    updateModifier("Constitution");
});
document.getElementById("Intelligence").addEventListener("input", function() {
    updateModifier("Intelligence");
});
document.getElementById("Wisdom").addEventListener("input", function() {
    updateModifier("Wisdom");
});
document.getElementById("Charisma").addEventListener("input", function() {
    updateModifier("Charisma");
});
updateModifier("Strength");
        updateModifier("Dexterity");
        updateModifier("Constitution");
        updateModifier("Intelligence");
        updateModifier("Wisdom");
        updateModifier("Charisma");
    

// Ensure that modifiers update when ability scores change
const abilityInputs = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
abilityInputs.forEach(stat => {
  document.getElementById(stat).addEventListener('input', updateModifier);
});
function displayClassFeatures() {
    const classValue = document.getElementById("class").value;
    const levelValue = parseInt(document.getElementById("Level").value, 10);
    const featuresContainer = document.getElementById("abilities");
  
    // Clear any previous content
    featuresContainer.innerHTML = "";
  
    if (!classValue || !classAbilities[classValue]) return;
  
    const abilities = classAbilities[classValue];
    const list = document.createElement("ul");
  
    // Get the numeric keys, sort them, then iterate
    const levels = Object.keys(abilities)
      .map(Number)
      .sort((a, b) => a - b);
  
    levels.forEach(lvl => {
      if (levelValue >= lvl) {
        const listItem = document.createElement("li");
        listItem.textContent = `Level ${lvl}: ${abilities[lvl]}`;
        list.appendChild(listItem);
      }
    });
  
    featuresContainer.appendChild(list);
  }
  function displaySubclassFeatures() {
    const classValue = document.getElementById("class").value;
    const levelValue = parseInt(document.getElementById("Level").value, 10);
    const featuresContainer = document.getElementById("subclassFeatures");
    
    // Clear previous subclass features
    featuresContainer.innerHTML = "";
  
    if (!classValue || !subclassFeatures[classValue]) return;
  
    // Determine the subclass select element ID based on the class.
    const subclassSelectId = {
      "Art": "Asubclass",
      "Barb": "Barbsubclass",
      "Bard": "Bardsubclass",
      "Cleric": "Clericsubclass",
      "Druid": "Druidsubclass",
      "Fighter": "Fightsubclass",
      "Monk": "Msubclass",
      "Paladin": "Psubclass",
      "Ranger": "Rasubclass",
      "Rogue": "Rosubclass",
      "Sorcerer": "Sorsubclass",
      "Warlock": "Warsubclass",
      "Wizard": "Wsubclass"
    }[classValue];
  
    if (!subclassSelectId) return;
  
    const subclassSelect = document.getElementById(subclassSelectId);
    const subclassValue = subclassSelect.value;
    if (!subclassValue) return;
  
    // Retrieve features for the selected subclass
    const featuresData = subclassFeatures[classValue][subclassValue];
    if (!featuresData) return;
  
    // Create a sorted list of feature levels
    const levels = Object.keys(featuresData)
      .map(Number)
      .sort((a, b) => a - b);
  
    const list = document.createElement("ul");
    levels.forEach(lvl => {
      if (levelValue >= lvl) {
        const listItem = document.createElement("li");
        listItem.textContent = `Level ${lvl}: ${featuresData[lvl]}`;
        list.appendChild(listItem);
      }
    });
  
    featuresContainer.appendChild(list);
  }
// Local Storage Functions
function setlocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getlocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
