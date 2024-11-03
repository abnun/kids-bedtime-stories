// src/components/CreatureCreationForm.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SaveIcon } from 'lucide-react';

interface CreatureCreationFormProps {
    newCreature: {
        name: string;
        // age: string;
        gender: string;
        looks_like: string
        interests: string[];
        personality_traits: string[];
    };
    setNewCreature: (creature: CreatureCreationFormProps['newCreature']) => void;
    handleCreateCreature: () => void;
}

const CreatureCreationForm: React.FC<CreatureCreationFormProps> = ({ newCreature, setNewCreature, handleCreateCreature }) => (
    <Card className="mb-10">
        <CardHeader>
            <CardTitle>Fabelwesen erstellen</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                    placeholder="Name"
                    value={newCreature.name}
                    onChange={(e) => setNewCreature({ ...newCreature, name: e.target.value })}
                />

                <Select
                    value={newCreature.gender}
                    onValueChange={(value) => setNewCreature({ ...newCreature, gender: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Geschlecht" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="männlich">Männlich</SelectItem>
                        <SelectItem value="weiblich">Weiblich</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <Input
                    placeholder="Hat diese Gestalt (z.B. Fee, Drache, Kobold)"
                    value={newCreature.looks_like}
                    onChange={(e) => setNewCreature({ ...newCreature, looks_like: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <Input
                    placeholder="Charaktereigenschaften (kommagetrennt)"
                    value={newCreature.personality_traits}
                    onChange={(e) => setNewCreature({ ...newCreature, personality_traits: [e.target.value] })}
                />
            </div>
            <div className="mb-4">
                <Input
                    placeholder="Kennt sich damit besonders gut aus (kommagetrennt)"
                    value={newCreature.interests}
                    onChange={(e) => setNewCreature({ ...newCreature, interests: [e.target.value] })}
                />
            </div>
            <Button className="mt-4" onClick={handleCreateCreature}>
                <SaveIcon className="mr-2" /> Neues Fabelwesen erstellen
            </Button>
        </CardContent>
    </Card>
);

export default CreatureCreationForm;
