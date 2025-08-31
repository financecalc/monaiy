'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  Eye,
  Download,
  Trash2,
  Globe,
  Palette,
  Bell,
  Database,
  Key,
  User,
  Smartphone,
  FileText,
  BarChart3,
  AlertTriangle,
  Info,
} from 'lucide-react';

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('preferences');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
        <p className="text-muted-foreground">
          Passen Sie monaiy an Ihre Bedürfnisse an
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences">Präferenzen</TabsTrigger>
          <TabsTrigger value="security">Sicherheit & Datenschutz</TabsTrigger>
          <TabsTrigger value="accessibility">
            Barrierefreiheit & Sprache
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <PreferencesTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <AccessibilityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PreferencesTab() {
  const [settings, setSettings] = useState({
    language: 'de',
    currency: 'EUR',
    theme: 'system',
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'de-DE',
    notifications: true,
    autoSync: true,
    compactMode: false,
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sprache & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Sprache</Label>
              <Select
                value={settings.language}
                onValueChange={(value: string) =>
                  handleSettingChange('language', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Währung</Label>
              <Select
                value={settings.currency}
                onValueChange={(value: string) =>
                  handleSettingChange('currency', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="CHF">Schweizer Franken (CHF)</SelectItem>
                  <SelectItem value="GBP">Britische Pfund (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Zeitraum</Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value: string) =>
                  handleSettingChange('dateFormat', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Select
                value={settings.numberFormat}
                onValueChange={(value: string) =>
                  handleSettingChange('numberFormat', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de-DE">Deutsch (1.234,56)</SelectItem>
                  <SelectItem value="en-US">English (1,234.56)</SelectItem>
                  <SelectItem value="fr-FR">Français (1 234,56)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Darstellung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Design</Label>
            <Select
              value={settings.theme}
              onValueChange={(value: string) =>
                handleSettingChange('theme', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Hell</SelectItem>
                <SelectItem value="dark">Dunkel</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compactMode">Kompakter Modus</Label>
              <p className="text-sm text-muted-foreground">
                Reduziert Abstände für mehr Inhalt auf dem Bildschirm
              </p>
            </div>
            <Switch
              id="compactMode"
              checked={settings.compactMode}
              onCheckedChange={(checked: boolean) =>
                handleSettingChange('compactMode', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Benachrichtigungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push-Benachrichtigungen</Label>
              <p className="text-sm text-muted-foreground">
                Erhalten Sie Benachrichtigungen über wichtige Ereignisse
              </p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked: boolean) =>
                handleSettingChange('notifications', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoSync">Automatische Synchronisation</Label>
              <p className="text-sm text-muted-foreground">
                Synchronisieren Sie Daten automatisch im Hintergrund
              </p>
            </div>
            <Switch
              id="autoSync"
              checked={settings.autoSync}
              onCheckedChange={(checked: boolean) =>
                handleSettingChange('autoSync', checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityTab() {
  const [lastExport, setLastExport] = useState<string | null>(
    '2024-01-10T14:30:00Z'
  );
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastExport(new Date().toISOString());
    setIsExporting(false);
  };

  const handleDeleteData = () => {
    if (
      confirm(
        'Sind Sie sicher, dass Sie alle Daten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
      )
    ) {
      // Handle data deletion
      console.log('Deleting all data...');
    }
  };

  return (
    <div className="space-y-4">
      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Datenexport
          </CardTitle>
          <CardDescription>
            Exportieren Sie Ihre Daten in verschiedenen Formaten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Letzter Export</p>
              <p className="text-sm text-muted-foreground">
                {lastExport
                  ? new Date(lastExport).toLocaleString('de-DE')
                  : 'Noch nie exportiert'}
              </p>
            </div>
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? 'Exportiere...' : 'Jetzt exportieren'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex flex-col items-center gap-2 p-4 h-auto">
              <FileText className="h-8 w-8" />
              <span>CSV Export</span>
              <span className="text-xs text-muted-foreground">
                Transaktionen
              </span>
            </Button>

            <Button className="flex flex-col items-center gap-2 p-4 h-auto">
              <Database className="h-8 w-8" />
              <span>JSON Export</span>
              <span className="text-xs text-muted-foreground">
                Vollständige Daten
              </span>
            </Button>

            <Button className="flex flex-col items-center gap-2 p-4 h-auto">
              <BarChart3 className="h-8 w-8" />
              <span>PDF Report</span>
              <span className="text-xs text-muted-foreground">
                Finanzbericht
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Datenschutz & Sicherheit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Verschlüsselung</p>
                  <p className="text-sm text-muted-foreground">
                    Alle Daten sind Ende-zu-Ende verschlüsselt
                  </p>
                </div>
              </div>
              <Badge>Aktiv</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Offline-Funktionalität</p>
                  <p className="text-sm text-muted-foreground">
                    Funktioniert auch ohne Internetverbindung
                  </p>
                </div>
              </div>
              <Badge>Aktiv</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Lokale Datenspeicherung</p>
                  <p className="text-sm text-muted-foreground">
                    Daten werden nur lokal gespeichert
                  </p>
                </div>
              </div>
              <Badge>Aktiv</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Datenverwaltung
          </CardTitle>
          <CardDescription>
            Verwalten Sie Ihre gespeicherten Daten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Wichtiger Hinweis</p>
                <p className="text-sm text-yellow-700">
                  Das Löschen von Daten kann nicht rückgängig gemacht werden.
                  Stellen Sie sicher, dass Sie einen Export erstellt haben.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDeleteData}>
              <Trash2 className="mr-2 h-4 w-4" />
              Alle Daten löschen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccessibilityTab() {
  const [accessibility, setAccessibility] = useState({
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    rtl: false,
  });

  const handleAccessibilityChange = (key: string, value: string | boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Visual Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visuelle Barrierefreiheit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Schriftgröße</Label>
            <Select
              value={accessibility.fontSize}
              onValueChange={(value: string) =>
                handleAccessibilityChange('fontSize', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Klein</SelectItem>
                <SelectItem value="medium">Mittel</SelectItem>
                <SelectItem value="large">Groß</SelectItem>
                <SelectItem value="xlarge">Sehr groß</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="highContrast">Hoher Kontrast</Label>
              <p className="text-sm text-muted-foreground">
                Erhöht den Kontrast für bessere Lesbarkeit
              </p>
            </div>
            <Switch
              id="highContrast"
              checked={accessibility.highContrast}
              onCheckedChange={(checked: boolean) =>
                handleAccessibilityChange('highContrast', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduceMotion">Bewegung reduzieren</Label>
              <p className="text-sm text-muted-foreground">
                Reduziert Animationen und Übergänge
              </p>
            </div>
            <Switch
              id="reduceMotion"
              checked={accessibility.reduceMotion}
              onCheckedChange={(checked: boolean) =>
                handleAccessibilityChange('reduceMotion', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Screen Reader Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Screen Reader Unterstützung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screenReader">Screen Reader Modus</Label>
              <p className="text-sm text-muted-foreground">
                Aktiviert zusätzliche ARIA-Labels und Beschreibungen
              </p>
            </div>
            <Switch
              id="screenReader"
              checked={accessibility.screenReader}
              onCheckedChange={(checked: boolean) =>
                handleAccessibilityChange('screenReader', checked)
              }
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">WCAG 2.1 AA Konform</p>
                <p className="text-sm text-blue-700">
                  monaiy erfüllt die internationalen Standards für
                  Barrierefreiheit. Alle Funktionen sind über Tastatur und
                  Screen Reader zugänglich.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Direction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sprachrichtung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rtl">Rechts-nach-Links (RTL)</Label>
              <p className="text-sm text-muted-foreground">
                Unterstützt Sprachen wie Arabisch und Hebräisch
              </p>
            </div>
            <Switch
              id="rtl"
              checked={accessibility.rtl}
              onCheckedChange={(checked: boolean) =>
                handleAccessibilityChange('rtl', checked)
              }
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Hinweis: RTL-Layout wird nur für unterstützte Sprachen aktiviert.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
