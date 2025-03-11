"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const steps = [
  {
    id: 1,
    title: "Определение ролей",
    description:
      "Выберите роли и распределите обязанности. Примеры ролей: Координатор (организует встречи), Исполнитель (выполняет задачи), Контролер (проверяет качество).",
    tip: "Важно! Координатор не значит лидер. В команде каждый отвечает за свою зону. Ошибка: Если все ждут указаний от одного человека, работа встанет. Разделите ответственность!",
  },
  {
    id: 2,
    title: "Распределение задач",
    description:
      "Разбейте проект на конкретные задачи. Используйте метод SMART: задача должна быть конкретной, измеримой, достижимой, актуальной и ограниченной по времени.",
    tip: "Попробуйте сформулировать задачу с помощью SMART. Например: 'Сделать первый прототип до 10 марта и получить 3 отзыва'. Ошибка: 'Сделать хорошо' — не SMART-задача!",
  },
  {
    id: 3,
    title: "Установка сроков",
    description:
      "Определите дедлайны и контрольные точки. Пример: создание чернового варианта - 3 дня, проверка и обратная связь - 2 дня.",
    tip: "Используйте метод обратного планирования: начните с конечной цели и двигайтесь назад к текущему моменту. Ошибка: Не оставляйте все на последний день!",
  },
  {
    id: 4,
    title: "Настройка коммуникации",
    description:
      "Выберите инструменты для общения (Telegram, Пачка, Notion). Договоритесь о частоте встреч: ежедневно, раз в неделю?",
    tip: "Разберите кейс: Один из членов команды пропал на неделю. Как вы поступите? Советы: 1) Уточните причину. 2) Назначьте резервного человека на важные задачи.",
  },
  {
    id: 5,
    title: "Промежуточные проверки",
    description:
      "Запланируйте регулярные встречи для отслеживания прогресса. Используйте методику Stand-up: что сделано, какие сложности, что дальше?",
    tip: "Попробуйте Stand-up прямо сейчас! Каждый участник отвечает на три вопроса за 1 минуту. Ошибка: Если никто не говорит о проблемах, значит, либо их скрывают, либо не анализируют!",
  },
];

export default function TeamStartChecklist() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) => (prev.includes(id) ? prev.filter((step) => step !== id) : [...prev, id]));
  };

  const progress = (completedSteps.length / steps.length) * 100;
  const allCompleted = completedSteps.length === steps.length;

  return (
    <TooltipProvider>
      <div className="max-w-lg mx-auto p-4">
        {allCompleted ? (
          <div className="text-center p-6 bg-green-100 border border-green-400 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-green-700">Поздравляем!</h1>
            <p className="text-lg text-gray-700">Вы успешно завершили все шаги чек-листа!</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">TeamStart: Чек-лист</h1>
            <Progress value={progress} className="mb-4" />
            {steps.map((step) => (
              <Card key={step.id} className="mb-2 p-4 border rounded-lg shadow">
                <CardContent className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{step.title}</h2>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <Tooltip>
                      <TooltipTrigger className="text-blue-500 text-sm cursor-pointer mt-2 inline-block">
                        💡 Подсказка
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-white p-5 shadow-2xs">
                        <p className="text-gray-700">{step.tip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Button
                    onClick={() => toggleStep(step.id)}
                    variant={completedSteps.includes(step.id) ? "outline" : "default"}
                  >
                    {completedSteps.includes(step.id) ? "Отменить" : "Готово"}
                  </Button>
                </CardContent>
              </Card>
            ))}
            <p className="text-center text-sm text-gray-500 mt-4">
              Завершено: {completedSteps.length}/{steps.length} шагов
            </p>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
