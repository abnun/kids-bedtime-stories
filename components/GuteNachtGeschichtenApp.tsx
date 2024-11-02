// src/components/GuteNachtGeschichtenApp.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CharacterCreationForm from './CharacterCreationForm';
import StoryGenerationForm from './StoryGenerationForm';
import GeneratedStoryCard from './GeneratedStoryCard';

interface Character {
    id: number;
    name: string;
    age: string;
    gender: string;
    personality_traits: string;
    interests: string;
}

const GuteNachtGeschichtenApp = () => {
    const baseUrl = "http://localhost:8000/api";
    const [characters, setCharacters] = useState<Character[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [educational_topic, setEducationalTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [newCharacter, setNewCharacter] = useState({
        name: '',
        age: '',
        gender: '',
        interests: [''],
        personality_traits: ['']
    });

    const [storyRequest, setStoryRequest] = useState({
        characters: [] as Character[], // Vollständige Character-Objekte speichern
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

    const handleGenerateStory = async () => {
        try {
            // // Nur IDs der Charaktere an das Backend senden
            // const requestWithIds = {
            //     ...storyRequest,
            //     characters: storyRequest.characters.map(character => character.id)
            // };

            console.log("Story Request: " + JSON.stringify(storyRequest));
            const response = await fetch(`${baseUrl}/stories/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storyRequest)
            });

            const data = await response.json();
            console.log("Response create new Story: " + JSON.stringify(data));
            setGeneratedStory(data.text);
            const element = document.getElementById('story-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log("Element with ID 'story-section' not found.")
            }
        } catch (error) {
            console.error("Failed to generate story", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">
                <Image
                    src="/der_geschichtenerzaehler.jpeg"
                    alt="Der Geschichten-Erzähler"
                    width="150"
                    height="150"
                />
                <br />
                Hallo ... ich bin der Geschichten-Erzähler.
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>
                        Gerne erzähle ich dir eine spannende und lehrreiche Geschichte.
                    </div>
                    <div className="mb-4">
                        Bevor es losgeht, lies unbedingt die <Link className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" href="#nutzungsbedingungen">Nutzungsbedingungen</Link> weiter unten.
                    </div>
                    <div className="mb-4">
                        Erstelle dazu entweder zuerst einen neuen Charakter oder wähle aus den bereits bestehenden weiter unten.
                    </div>
                    <CharacterCreationForm
                        newCharacter={newCharacter}
                        setNewCharacter={setNewCharacter}
                        handleCreateCharacter={handleCreateCharacter}
                    />
                    <div className="mb-4">
                        <p>
                            Wähle nun deine Charaktere aus, an welchem Ort die Geschichte spielen und welches pädagogische Thema vermittelt werden soll.
                        </p>
                        <p>
                            Wenn du möchtest, kannst du auch noch spezielle Wesen zu der Geschichte hinzufügen.
                        </p>
                    </div>
                    <StoryGenerationForm
                        newStoryRequest={storyRequest}
                        setStoryRequest={setStoryRequest}
                        characters={characters}
                        locations={locations}
                        educational_topic={educational_topic}
                        handleGenerateStory={handleGenerateStory}
                    />
                    <div id="story-section">
                        {generatedStory && <GeneratedStoryCard generatedStory={generatedStory} />}
                    </div>
                </>
            )}
            <Card id="nutzungsbedingungen" className="mb-4 space-y-4">
                <CardHeader>
                    <CardTitle>Nutzungsbedingungen</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>
                            Es wird keine Haftung oder Verantwortung für die generierten Texte übernommen.
                        </p>
                        <p>
                            Es kann jederzeit dazu kommen, dass der Text-Generator nicht mehr funktioniert (z.B. durch Überlastung, geänderte Nutzungsbedingungen seitens der eingesetzten Drittanbieter, etc.)
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuteNachtGeschichtenApp;