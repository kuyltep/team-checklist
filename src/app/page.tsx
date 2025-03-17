"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { steps } from "@/data/steps";

export default function TeamStartChecklist() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const progress = (completedSteps.length / steps.length) * 100;

  const allStepsCompleted = completedSteps.length === steps.length;

  const toggleStep = (id: number) =>
    setCompletedSteps((prev) => (prev.includes(id) ? prev.filter((step) => step !== id) : [...prev, id]));

  return allStepsCompleted ? (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="text-center p-6 bg-green-100 border border-green-400 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-green-700">Поздравляем!</h1>
        <p className="text-lg text-gray-700">Вы успешно завершили все шаги чек-листа!</p>
      </div>
    </div>
  ) : selectedStep !== null ? (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">{steps.find((s) => s.id === selectedStep)?.title}</h2>
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: steps.find((s) => s.id === selectedStep)!.details,
        }}
      />
      <Button onClick={() => setSelectedStep(null)}>← Вернуться</Button>
    </div>
  ) : (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Чеклист запуска командной работы</h2>
      <Progress value={progress} />
      <div className="grid gap-4">
        {steps.map((step) => (
          <Card key={step.id} className={completedSteps.includes(step.id) ? "opacity-50" : ""}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedStep(step.id)}>
                        Подробнее
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p>{step.shortDescription}</p>
              <Button
                variant={completedSteps.includes(step.id) ? "secondary" : "default"}
                onClick={() => toggleStep(step.id)}
              >
                {completedSteps.includes(step.id) ? "Отменить выполнение" : "Отметить выполненным"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
