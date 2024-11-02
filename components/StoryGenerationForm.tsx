// src/components/StoryGenerationForm.tsx
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from 'lucide-react';

interface Character {
    id: number;
    name: string;
    age: string;
    gender: string;
    personality_traits: string;
    interests: string;
}

interface StoryGenerationFormProps {
    characters: Character[];
    locations: string[];
    educational_topic: string[];
    newStoryRequest: {
        characters: Character[];
        location: string;
        educational_topic: string;
        age_group: string;
    };
    setStoryRequest: (storyRequest: StoryGenerationFormProps['newStoryRequest']) => void;
    handleGenerateStory: () => void;
}

const StoryGenerationForm: React.FC<StoryGenerationFormProps> = ({
    characters,
    locations,
    educational_topic,
    newStoryRequest,
    setStoryRequest,
    handleGenerateStory,
}) => {
    // Effect zum Synchronisieren der ausgewählten Charaktere
    useEffect(() => {
        console.log("Characters in StoryGenerationForm:" + JSON.stringify(characters));
        // Finde alle ausgewählten Charaktere, die noch in der Hauptliste existieren
        const validCharacters = characters.filter(char =>
            newStoryRequest.characters.some(selected => selected.id === char.id)
        );

        // Aktualisiere nur, wenn sich etwas geändert hat
        if (validCharacters.length !== newStoryRequest.characters.length) {
            setStoryRequest({
                ...newStoryRequest,
                characters: validCharacters
            });
        }
    }, [characters, newStoryRequest, setStoryRequest]);

    const handleCharacterToggle = (character: Character) => {
        const isSelected = newStoryRequest.characters.some(selected => selected.id === character.id);

        const updatedCharacters = isSelected
            ? newStoryRequest.characters.filter(selected => selected.id !== character.id)
            : [...newStoryRequest.characters, character];

        console.log("updatedCharacters: " + JSON.stringify(updatedCharacters));

        setStoryRequest({ ...newStoryRequest, characters: updatedCharacters });
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Geschichte generieren</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Character Checkbox List */}
                    <div>
                        <h3>Charaktere auswählen:</h3>
                        {characters.map((character) => (
                            <div key={character.id} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={newStoryRequest.characters.some(selected => selected.id === character.id)}
                                    value={character.id}
                                    onCheckedChange={() => handleCharacterToggle(character)}
                                />
                                <label>
                                    <strong>{character.name}</strong> Alter: {character.age}; Geschlecht: {character.gender}; Charaktereigenschaften: {character.personality_traits}; Interessen: {character.interests}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Location Select */}
                    <select
                        value={newStoryRequest.location}
                        onChange={(e) => setStoryRequest({ ...newStoryRequest, location: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="" disabled>Ort der Geschichte auswählen</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>

                    {/* Educational Topic Select */}
                    <select
                        value={newStoryRequest.educational_topic}
                        onChange={(e) => setStoryRequest({ ...newStoryRequest, educational_topic: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="" disabled>Pädagogisches Thema auswählen</option>
                        {educational_topic.map((topic) => (
                            <option key={topic} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>

                    {/* Age Group Select */}
                    <select
                        value={newStoryRequest.age_group}
                        onChange={(e) => setStoryRequest({ ...newStoryRequest, age_group: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="" disabled>Altersgruppe auswählen</option>
                        <option value="Kinder">Kinder</option>
                        <option value="Jugendliche">Jugendliche</option>
                        <option value="Erwachsene">Erwachsene</option>
                    </select>

                    {/* Generate Story Button */}
                    <Button
                        onClick={handleGenerateStory}
                        disabled={!newStoryRequest.location || !newStoryRequest.educational_topic || !newStoryRequest.age_group}
                        className="w-full"
                    >
                        <BookOpen className="mr-2" /> Geschichte generieren
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default StoryGenerationForm;

