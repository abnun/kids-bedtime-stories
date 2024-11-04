// src/components/StoryGenerationForm.tsx
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from 'lucide-react';

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

interface StoryGenerationFormProps {
    characters: Character[];
    creatures: Creature[];
    locations: string[];
    educational_topic: string[];
    newStoryRequest: {
        characters: Character[];
        creatures: Creature[];
        location: string;
        educational_topic: string;
        age_group: string;
    };
    setStoryRequest: (storyRequest: StoryGenerationFormProps['newStoryRequest']) => void;
    handleGenerateStory: () => void;
}

const StoryGenerationForm: React.FC<StoryGenerationFormProps> = ({
    characters,
    creatures,
    locations,
    educational_topic,
    newStoryRequest,
    setStoryRequest,
    handleGenerateStory,
}) => {
    // Effect zum Synchronisieren der ausgewählten Charaktere
    useEffect(() => {
        console.log("Characters in StoryGenerationForm:" + JSON.stringify(characters));
        console.log("Creatures in StoryGenerationForm:" + JSON.stringify(creatures));
        // Finde alle ausgewählten Charaktere, die noch in der Hauptliste existieren
        const validCharacters = characters.filter(char =>
            newStoryRequest.characters.some(selected => selected.id === char.id)
        );

        const validCreatures = creatures.filter(char =>
            newStoryRequest.creatures.some(selected => selected.id === char.id)
        );

        // Aktualisiere nur, wenn sich etwas geändert hat
        if (validCharacters.length !== newStoryRequest.characters.length) {
            setStoryRequest({
                ...newStoryRequest,
                characters: validCharacters
            });
        }

        if (validCreatures.length !== newStoryRequest.creatures.length) {
            setStoryRequest({
                ...newStoryRequest,
                creatures: validCreatures
            });
        }
    }, [characters, creatures, newStoryRequest, setStoryRequest]);

    const handleCharacterToggle = (character: Character) => {
        const isSelected = newStoryRequest.characters.some(selected => selected.id === character.id);

        const updatedCharacters = isSelected
            ? newStoryRequest.characters.filter(selected => selected.id !== character.id)
            : [...newStoryRequest.characters, character];

        console.log("updatedCharacters: " + JSON.stringify(updatedCharacters));

        setStoryRequest({ ...newStoryRequest, characters: updatedCharacters });
    };

    const handleCreatureToggle = (creature: Creature) => {
        const isSelected = newStoryRequest.creatures.some(selected => selected.id === creature.id);

        const updatedCreatures = isSelected
            ? newStoryRequest.creatures.filter(selected => selected.id !== creature.id)
            : [...newStoryRequest.creatures, creature];

        console.log("updatedCreatures: " + JSON.stringify(updatedCreatures));

        setStoryRequest({ ...newStoryRequest, creatures: updatedCreatures });
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Geschichte generieren</CardTitle>
            </CardHeader>
            <CardContent>
                <div id='geschichten-formular'>
                    {/* Character Checkbox List */}
                    <div className="mb-4">
                        <h3 id='geschichten-formular-charaktere'>Charaktere auswählen:</h3>
                        {characters.map((character) => (
                            <div key={character.id} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={newStoryRequest.characters.some(selected => selected.id === character.id)}
                                    value={character.id}
                                    onCheckedChange={() => handleCharacterToggle(character)}
                                />
                                <label>
                                    <strong>{character.name}</strong> - Alter: {character.age}; {character.gender}; Charakter: {character.personality_traits}; Interessen: {character.interests}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Creature Checkbox List */}
                    <div className="mb-4">
                        <h3 id='geschichten-formular-fabelwesen'>Fabelwesen auswählen:</h3>
                        {creatures.map((creature) => (
                            <div key={creature.id} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={newStoryRequest.creatures.some(selected => selected.id === creature.id)}
                                    value={creature.id}
                                    onCheckedChange={() => handleCreatureToggle(creature)}
                                />
                                <label>
                                    <strong>{creature.name}</strong> - Gestalt: {creature.looks_like}; {creature.gender}; Charakter: {creature.personality_traits}; Weiß alles über: {creature.interests}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Location Select */}
                    <select
                        value={newStoryRequest.location}
                        onChange={(e) => setStoryRequest({ ...newStoryRequest, location: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
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
                        className="w-full p-2 border rounded mb-2"
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
                        className="w-full p-2 border rounded mb-4"
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

