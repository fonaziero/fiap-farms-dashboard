import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { setTheme } from '../lib/utils';

const themes = ['default', 'blue', 'dark'] as const;

type Theme = (typeof themes)[number];
type ChartType = 'line' | 'bar';

type UserSettings = {
    theme: Theme;
    showWelcome: boolean;
    defaultChartType: ChartType;
};

const LOCAL_STORAGE_KEY = 'fiap-settings';

export default function Settings() {
    const [theme, setThemeState] = useState<Theme>('default');
    const [showWelcome, setShowWelcome] = useState(true);
    const [defaultChartType, setDefaultChartType] = useState<ChartType>('line');

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const parsed: UserSettings = JSON.parse(saved);
            setTheme(parsed.theme);
            setThemeState(parsed.theme);
            setShowWelcome(parsed.showWelcome);
            setDefaultChartType(parsed.defaultChartType);
        }
    }, []);

    const handleThemeChange = (value: Theme) => {
        setThemeState(value);
        setTheme(value);
        saveSettings({ theme: value, showWelcome, defaultChartType });
    };

    const handleWelcomeChange = (val: boolean) => {
        setShowWelcome(val);
        saveSettings({ theme, showWelcome: val, defaultChartType });
    };

    const handleChartTypeChange = (val: ChartType) => {
        setDefaultChartType(val);
        saveSettings({ theme, showWelcome, defaultChartType: val });
    };

    const saveSettings = (settings: UserSettings) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    };

    return (
        <div className="flex-1 min-h-screen bg-background text-foreground p-6 ">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">⚙️ Configurações do Portal</h1>

                <Card>
                    <CardHeader>
                        <h2 className="font-semibold">Tema</h2>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={theme}
                            onValueChange={(val: Theme) => handleThemeChange(val)}
                            className="space-y-2"
                        >
                            {themes.map(t => (
                                <div key={t} className="flex items-center space-x-2">
                                    <RadioGroupItem value={t} id={t} />
                                    <Label htmlFor={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Preferências */}
                <Card>
                    <CardHeader>
                        <h2 className="font-semibold">Preferências</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Mostrar mensagem de boas-vindas</Label>
                            <Switch checked={showWelcome} onCheckedChange={handleWelcomeChange} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Gráfico padrão</Label>
                            <select
                                value={defaultChartType}
                                onChange={(e) => handleChartTypeChange(e.target.value as ChartType)}
                                className="p-2 border rounded bg-card text-card-foreground"
                            >
                                <option value="line">Linha</option>
                                <option value="bar">Barra</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
