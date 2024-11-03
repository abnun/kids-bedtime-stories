// src/components/GeneratedStoryCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneratedStoryCardProps {
    generatedStory: string;
}

const GeneratedStoryCard: React.FC<GeneratedStoryCardProps> = ({ generatedStory }) => (
    <Card className="mb-20">
        <CardHeader><CardTitle className="text-2xl">Hier ist Deine Geschichte</CardTitle></CardHeader>

        <CardContent>
            <p className="whitespace-pre-wrap">
                {!generatedStory ? (
                    "Du musst zuerst alles auswählen und auf \"Geschichte generieren\" klicken ..."
                ) : (
                    <>
                        {generatedStory}
                    </>
                )}
            </p>
        </CardContent>

    </Card>
);

export default GeneratedStoryCard;
