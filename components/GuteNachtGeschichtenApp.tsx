// src/components/GuteNachtGeschichtenApp.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from "@nextui-org/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CharacterCreationForm from './CharacterCreationForm';
import CreatureCreationForm from './CreatureCreationForm';
import StoryGenerationForm from './StoryGenerationForm';
import GeneratedStoryCard from './GeneratedStoryCard';

interface Character {
    id: string;
    name: string;
    age: string;
    gender: string;
    personality_traits: string;
    interests: string;
}

interface Creature {
    id: string;
    name: string;
    // age: string;
    gender: string;
    looks_like: string;
    personality_traits: string;
    interests: string;
}

const GuteNachtGeschichtenApp = () => {
    const baseUrl = process.env.NEXT_PUBLIC_KIDS_BEDTIME_STORIES_API_URL;
    console.log("API URL: " + baseUrl)
    const [characters, setCharacters] = useState<Character[]>([]);
    const [creatures, setCreatures] = useState<Creature[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [educational_topic, setEducationalTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [storyLoading, setStoryLoading] = useState<boolean>(false);

    const [newCharacter, setNewCharacter] = useState({
        name: '',
        age: '',
        gender: '',
        interests: [''],
        personality_traits: ['']
    });

    const [newCreature, setNewCreature] = useState({
        name: '',
        // age: '',
        gender: '',
        looks_like: '',
        interests: [''],
        personality_traits: ['']
    });

    const [storyRequest, setStoryRequest] = useState({
        characters: [] as Character[], // Vollständige Character-Objekte speichern
        creatures: [] as Creature[], // Vollständige Creature-Objekte speichern
        location: '',
        educational_topic: '',
        age_group: ''
    });

    const [generatedStory, setGeneratedStory] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/metadata`);
                if (!response.ok) throw new Error('Failed to fetch metadata');
                const data = await response.json();
                console.log("Metadata: " + JSON.stringify(data));

                setCharacters(data.characters || []);
                setCreatures(data.creatures || []);
                setLocations(data.locations || []);
                setEducationalTopics(data.educational_topics || []);
            } catch (error) {
                console.error("Error loading metadata", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/characters`);
            if (!response.ok) throw new Error('Failed to fetch characters');
            const data = await response.json();
            console.log("Characters: " + JSON.stringify(data));

            setCharacters(data.characters || []);
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCreatures = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/creatures`);
            if (!response.ok) throw new Error('Failed to fetch creatures');
            const data = await response.json();
            console.log("Creatures: " + JSON.stringify(data));

            setCreatures(data.creatures || []);
        } catch (error) {
            console.error("Error fetching creatures:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCharacter = async () => {
        try {
            console.log("New Character: " + JSON.stringify(newCharacter));
            const response = await fetch(`${baseUrl}/characters/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCharacter),
            });

            console.log("Response create new Character: " + JSON.stringify(response));

            if (!response.ok) throw new Error('Failed to create character');

            await fetchCharacters();

            setNewCharacter({
                name: '',
                age: '',
                gender: '',
                interests: [],
                personality_traits: [],
            });
            window.location.reload();
        } catch (error) {
            console.error("Error creating character:", error);
        }
    };

    const handleCreateCreature = async () => {
        try {
            console.log("New Creature: " + JSON.stringify(newCreature));
            const response = await fetch(`${baseUrl}/creatures/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCreature),
            });

            console.log("Response create new Creature: " + JSON.stringify(response));

            if (!response.ok) throw new Error('Failed to create creature');

            await fetchCreatures();

            setNewCreature({
                name: '',
                // age: '',
                gender: '',
                looks_like: '',
                interests: [],
                personality_traits: [],
            });
            // window.location.reload();
        } catch (error) {
            console.error("Error creating creature:", error);
        }
    };

    const handleGenerateStory = async () => {
        try {
            // // Nur IDs der Charaktere an das Backend senden
            // const requestWithIds = {
            //     ...storyRequest,
            //     characters: storyRequest.characters.map(character => character.id)
            // };
            setStoryLoading(true)
            console.log("Story Request: " + JSON.stringify(storyRequest));
            const response = await fetch(`${baseUrl}/stories/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storyRequest)
            });

            const data = await response.json();
            console.log("Response create new Story: " + JSON.stringify(data));
            setGeneratedStory(data.text);

            setStoryLoading(false)
            scrollToElement('story-section');
        } catch (error) {
            console.error("Failed to generate story", error);
        }
    };

    const scrollToElement = (element_id: string) => {
        const element = document.getElementById(element_id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log(`Element with ID ${element_id} not found.`)
        }
    }

    const onUsageHintLinkClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        scrollToElement('nutzungshinweise')
    };

    return (
        <div className="container mx-auto p-2">
            <h1 className="text-3xl font-bold mb-6">
                <Image
                    src="/der_geschichtenerzaehler.jpeg"
                    alt="Der Geschichten-Erzähler"
                    width="150"
                    height="150"
                    className='mb-4'
                />
                Hallo, ich bin der Geschichten-Erzähler.
            </h1>

            {loading ? (
                <div className="mb-20">
                    <Spinner label="Einen kleinen Moment, ich bin gleich voll und ganz bei dir ..." size="lg" color="secondary" />
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        Gerne erzähle ich dir eine spannende und lehrreiche Geschichte.
                    </div>
                    <div>
                        Bevor es losgeht, lies unbedingt die <Link className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" href="#" onClick={onUsageHintLinkClick}>Nutzungshinweise</Link> weiter unten.
                    </div>
                    <div className="mb-4">
                        Durch die Nutzung dieser Seite erklärst du dich damit einverstanden.
                    </div>
                    <div className="mb-4">
                        Erstelle nun entweder zuerst einen neuen Charakter oder wähle aus den bereits bestehenden Charakteren weiter unten.
                    </div>
                    <CharacterCreationForm
                        newCharacter={newCharacter}
                        setNewCharacter={setNewCharacter}
                        handleCreateCharacter={handleCreateCharacter}
                    />
                    <div className="mb-4">
                        Wenn du möchtest, erstelle nun noch ein Fabelwesen oder wähle eines aus den bereits bestehenden weiter unten.
                    </div>
                    <CreatureCreationForm
                        newCreature={newCreature}
                        setNewCreature={setNewCreature}
                        handleCreateCreature={handleCreateCreature}
                    />
                    <div className="mb-10">
                        <p>
                            Wähle nun deine Charaktere aus, an welchem Ort die Geschichte spielen und welches pädagogische Thema vermittelt werden soll.
                        </p>
                        <p>
                            Wenn du möchtest, kannst du auch noch Fabelwesen zu der Geschichte hinzufügen.
                        </p>
                    </div>
                    <StoryGenerationForm
                        newStoryRequest={storyRequest}
                        setStoryRequest={setStoryRequest}
                        characters={characters}
                        creatures={creatures}
                        locations={locations}
                        educational_topic={educational_topic}
                        handleGenerateStory={handleGenerateStory}
                    />
                    {storyLoading ? (
                        <div className="mb-20">
                            <Spinner label="Ich überlege mir nun eine Geschichte, das dauert einen kleinen Moment ..." size="lg" color="secondary" />
                        </div>
                    ) : (
                        <>
                            <div id="story-section">
                                {generatedStory && <GeneratedStoryCard generatedStory={generatedStory} />}
                            </div>
                        </>
                    )}
                </>
            )}
            <Card id="nutzungshinweise" className="mb-4">
                <CardHeader>
                    <CardTitle>Nutzungshinweise</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='list-disc'>
                        <li>
                            Nutzung auf eigene Gewähr. Es wird keine Haftung oder Verantwortung für die generierten Texte übernommen.
                        </li>
                        <li>
                            Die Server legen sich bei Inaktivität schlafen, was dazu führt, dass die Seite erstmal sehr lange läd.
                        </li>
                        <li>
                            Andere können die Charaktere und Fabelwesen ebenso erstellen, also nicht wundern, wenn die Liste plötzlich anders aussieht.
                        </li>
                        <li>
                            Die Qualität von Texten, die durch &quot;Künstliche Intelligenz&quot; erzeugt werden, kann erheblich schwanken.
                            Dies kann zu teilweise (grammatikalisch) falschen, sinnfreien oder sogar lustigen Ergebnissen führen.
                        </li>
                        <li>
                            Es kann jederzeit dazu kommen, dass der Text-Generator nicht mehr funktioniert oder sehr lange läd (z.B. durch Überlastung der Server oder geänderter Nutzungsbedingungen seitens der eingesetzten Drittanbieter, etc.)
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuteNachtGeschichtenApp;
