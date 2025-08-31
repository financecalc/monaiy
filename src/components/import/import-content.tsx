'use client';

import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  BarChart3,
  CreditCard,
  Building2,
} from 'lucide-react';

interface ImportJob {
  id: string;
  filename: string;
  type: 'CSV' | 'PDF' | 'JSON';
  size: string;
  source: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  date: string;
  transactions: number;
  errors?: string[];
}

const mockImports: ImportJob[] = [
  {
    id: '1',
    filename: 'traderepublic_jan2024.csv',
    type: 'CSV',
    size: '45.2 KB',
    source: 'Trade Republic',
    status: 'completed',
    progress: 100,
    date: '2024-01-15T09:15:00Z',
    transactions: 23,
  },
  {
    id: '2',
    filename: 'paypal_export_jan.pdf',
    type: 'PDF',
    size: '128.7 KB',
    source: 'PayPal',
    status: 'completed',
    progress: 100,
    date: '2024-01-14T14:30:00Z',
    transactions: 45,
  },
  {
    id: '3',
    filename: 'sparkasse_umsaetze.csv',
    type: 'CSV',
    size: '89.1 KB',
    source: 'Sparkasse',
    status: 'processing',
    progress: 65,
    date: '2024-01-15T16:45:00Z',
    transactions: 0,
  },
  {
    id: '4',
    filename: 'degiro_portfolio.json',
    type: 'JSON',
    size: '23.4 KB',
    source: 'DeGiro',
    status: 'failed',
    progress: 0,
    date: '2024-01-13T11:20:00Z',
    transactions: 0,
    errors: ['Ungültiges JSON-Format', 'Fehlende Pflichtfelder'],
  },
];

const supportedSources = [
  {
    name: 'Trade Republic',
    icon: <Building2 className="h-4 w-4" />,
    formats: ['CSV'],
  },
  {
    name: 'PayPal',
    icon: <CreditCard className="h-4 w-4" />,
    formats: ['CSV', 'PDF'],
  },
  {
    name: 'Sparkasse',
    icon: <Building2 className="h-4 w-4" />,
    formats: ['CSV'],
  },
  {
    name: 'DeGiro',
    icon: <BarChart3 className="h-4 w-4" />,
    formats: ['CSV', 'JSON'],
  },
  { name: 'N26', icon: <Building2 className="h-4 w-4" />, formats: ['CSV'] },
  {
    name: 'Comdirect',
    icon: <Building2 className="h-4 w-4" />,
    formats: ['CSV'],
  },
];

export function ImportContent() {
  const [imports, setImports] = useState<ImportJob[]>(mockImports);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !selectedSource) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload and processing
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newImport: ImportJob = {
      id: Date.now().toString(),
      filename: file.name,
      type: file.name.endsWith('.csv')
        ? 'CSV'
        : file.name.endsWith('.pdf')
          ? 'PDF'
          : 'JSON',
      size: `${(file.size / 1024).toFixed(1)} KB`,
      source: selectedSource,
      status: 'completed',
      progress: 100,
      date: new Date().toISOString(),
      transactions: Math.floor(Math.random() * 100) + 10,
    };

    setImports([newImport, ...imports]);
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedSource('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetry = async (importId: string) => {
    setImports(
      imports.map(imp =>
        imp.id === importId
          ? { ...imp, status: 'processing', progress: 0 }
          : imp
      )
    );

    // Simulate retry processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setImports(
      imports.map(imp =>
        imp.id === importId
          ? {
              ...imp,
              status: 'completed',
              progress: 100,
              transactions: Math.floor(Math.random() * 100) + 10,
            }
          : imp
      )
    );
  };

  const handleDelete = (importId: string) => {
    setImports(imports.filter(imp => imp.id !== importId));
  };

  const getStatusIcon = (status: ImportJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: ImportJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Import</h1>
        <p className="text-muted-foreground">
          Importieren Sie Transaktionsdaten von Ihren Finanzdienstleistern
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Datei hochladen
          </CardTitle>
          <CardDescription>
            Wählen Sie eine Datei und den entsprechenden Finanzdienstleister aus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Finanzdienstleister</label>
              <select
                value={selectedSource}
                onChange={e => setSelectedSource(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
                disabled={isUploading}
              >
                <option value="">Bitte wählen...</option>
                {supportedSources.map(source => (
                  <option key={source.name} value={source.name}>
                    {source.name} ({source.formats.join(', ')})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Datei auswählen</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.pdf,.json"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-input rounded-md"
                disabled={isUploading || !selectedSource}
              />
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload läuft...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>Unterstützte Formate: CSV, PDF, JSON</p>
            <p>Maximale Dateigröße: 10 MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Supported Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Unterstützte Finanzdienstleister</CardTitle>
          <CardDescription>
            Diese Anbieter werden automatisch erkannt und verarbeitet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedSources.map(source => (
              <div
                key={source.name}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                {source.icon}
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {source.formats.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Import-Historie
          </CardTitle>
          <CardDescription>
            Übersicht aller Import-Vorgänge und deren Status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {imports.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Noch keine Imports vorhanden
                </p>
              </div>
            ) : (
              imports.map(importJob => (
                <div key={importJob.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(importJob.status)}
                      <div>
                        <p className="font-medium">{importJob.filename}</p>
                        <p className="text-sm text-muted-foreground">
                          {importJob.source} • {importJob.type} •{' '}
                          {importJob.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(importJob.status)}>
                        {importJob.status === 'completed' && 'Abgeschlossen'}
                        {importJob.status === 'processing' && 'Verarbeitung'}
                        {importJob.status === 'failed' && 'Fehlgeschlagen'}
                        {importJob.status === 'pending' && 'Wartend'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(importJob.date).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>

                  {importJob.status === 'processing' && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Verarbeitung...</span>
                        <span>{importJob.progress}%</span>
                      </div>
                      <Progress value={importJob.progress} />
                    </div>
                  )}

                  {importJob.status === 'completed' && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>
                        ✓ {importJob.transactions} Transaktionen importiert
                      </span>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Protokoll
                      </Button>
                    </div>
                  )}

                  {importJob.status === 'failed' && importJob.errors && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-red-600 mb-2">
                        Fehler:
                      </p>
                      <ul className="text-sm text-red-600 space-y-1">
                        {importJob.errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {importJob.status === 'failed' && (
                      <Button
                        size="sm"
                        onClick={() => handleRetry(importJob.id)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Wiederholen
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleDelete(importJob.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Löschen
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
