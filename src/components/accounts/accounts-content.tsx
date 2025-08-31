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
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Banknote,
  CreditCard,
  FileText,
  Plus,
  RefreshCw,
  CheckCircle,
  Clock,
} from 'lucide-react';

export function AccountsContent() {
  const [activeTab, setActiveTab] = useState('bank');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Konten</h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Bankverbindungen und synchronisieren Sie Ihre
          Finanzdaten
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bank">Bank-Verbindungen</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="import">Broker-Import</TabsTrigger>
        </TabsList>

        <TabsContent value="bank" className="space-y-4">
          <BankConnections />
        </TabsContent>

        <TabsContent value="paypal" className="space-y-4">
          <PayPalSync />
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <BrokerImport />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BankConnections() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connections] = useState([
    {
      id: 1,
      name: 'Sparkasse',
      status: 'connected',
      lastSync: '2024-01-15T10:30:00Z',
      accountCount: 2,
    },
  ]);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate FinTS connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
  };

  if (connections.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Banknote className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Keine Bankverbindungen</h3>
          <p className="text-muted-foreground text-center mb-4">
            Verbinden Sie Ihre erste Bank über FinTS, um Transaktionen zu
            synchronisieren
          </p>
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Verbinde...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Bank verbinden
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Verbundene Banken</h3>
        <Button onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Verbinde...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Weitere Bank
            </>
          )}
        </Button>
      </div>

      {connections.map(connection => (
        <Card key={connection.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {connection.name}
                  <Badge>{connection.accountCount} Konten</Badge>
                </CardTitle>
                <CardDescription>
                  Zuletzt synchronisiert:{' '}
                  {new Date(connection.lastSync).toLocaleString('de-DE')}
                </CardDescription>
              </div>
              <Badge className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Verbunden
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Jetzt synchronisieren
              </Button>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Protokoll anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PayPalSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-14T15:45:00Z');
  const [newTransactions, setNewTransactions] = useState(12);

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate PayPal sync
    await new Promise(resolve => setTimeout(resolve, 3000));
    setNewTransactions(0);
    setLastSync(new Date().toISOString());
    setIsSyncing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          PayPal-Synchronisation
        </CardTitle>
        <CardDescription>
          Synchronisieren Sie Ihre PayPal-Transaktionen automatisch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Letzter Sync:</span>
            <span className="font-medium">
              {new Date(lastSync).toLocaleString('de-DE')}
            </span>
          </div>
          {newTransactions > 0 && (
            <Badge>{newTransactions} neue Transaktionen</Badge>
          )}
        </div>

        <Button onClick={handleSync} disabled={isSyncing} className="w-full">
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Synchronisiere...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Jetzt synchronisieren
            </>
          )}
        </Button>

        {newTransactions === 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4" />
            Alle Transaktionen sind auf dem neuesten Stand
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BrokerImport() {
  const [isUploading, setIsUploading] = useState(false);
  const [imports, setImports] = useState([
    {
      id: 1,
      filename: 'traderepublic_jan2024.csv',
      type: 'CSV',
      size: '45.2 KB',
      date: '2024-01-15T09:15:00Z',
      status: 'completed',
      transactions: 23,
    },
  ]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate file upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newImport = {
      id: Date.now(),
      filename: file.name,
      type: file.name.endsWith('.csv') ? 'CSV' : 'PDF',
      size: `${(file.size / 1024).toFixed(1)} KB`,
      date: new Date().toISOString(),
      status: 'completed' as const,
      transactions: Math.floor(Math.random() * 50) + 1,
    };

    setImports([newImport, ...imports]);
    setIsUploading(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Datei hochladen
          </CardTitle>
          <CardDescription>
            Laden Sie CSV- oder PDF-Dateien von Ihrem Broker hoch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".csv,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {isUploading ? (
                <>
                  <LoadingSpinner />
                  <span className="text-sm text-muted-foreground">
                    Verarbeite Datei...
                  </span>
                </>
              ) : (
                <>
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <span className="font-medium">Datei auswählen</span>
                  <span className="text-sm text-muted-foreground">
                    oder hierher ziehen
                  </span>
                </>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Import-Historie</h3>
        <div className="space-y-2">
          {imports.map(importItem => (
            <Card key={importItem.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{importItem.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {importItem.type} • {importItem.size} •{' '}
                        {importItem.transactions} Transaktionen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>
                      {importItem.status === 'completed'
                        ? 'Abgeschlossen'
                        : 'Verarbeitung'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(importItem.date).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
