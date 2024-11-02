// src/components/CharacterCreationForm.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CharacterCreationFormProps {
    newCharacter: {
        name: string;
        age: string;
        gender: string;
        interests: string[];
        personality_traits: string[];
    };
    setNewCharacter: (character: CharacterCreationFormProps['newCharacter']) => void;
    handleCreateCharacter: () => void;
}

const CharacterCreationForm: React.FC<CharacterCreationFormProps> = ({ newCharacter, setNewCharacter, handleCreateCharacter }) => (
    <Card className="mb-4">
        <CardHeader>
            <CardTitle>Charakter erstellen</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4">
                <Input
                    placeholder="Name"
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                />
                <Input
                    placeholder="Alter"
                    type="number"
                    value={newCharacter.age}
                    onChange={(e) => setNewCharacter({ ...newCharacter, age: e.target.value })}
                />
                <Select
                    value={newCharacter.gender}
                    onValueChange={(value) => setNewCharacter({ ...newCharacter, gender: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Geschlecht" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="männlich">Männlich</SelectItem>
                        <SelectItem value="weiblich">Weiblich</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    placeholder="Charaktereigenschaften (kommagetrennt)"
                    value={newCharacter.personality_traits}
                    onChange={(e) => setNewCharacter({ ...newCharacter, personality_traits: [e.target.value] })}
                />
                <Input
                    placeholder="Interessen (kommagetrennt)"
                    value={newCharacter.interests}
                    onChange={(e) => setNewCharacter({ ...newCharacter, interests: [e.target.value] })}
                />
            </div>
            <Button className="mt-4" onClick={handleCreateCharacter}>
                Neuen Charakter erstellen
            </Button>
        </CardContent>
    </Card>
);

export default CharacterCreationForm;
