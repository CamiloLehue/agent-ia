# Integración con ElevenLabs

Este módulo proporciona una integración con la API de ElevenLabs para el diseño y generación de voces mediante IA.

## Características

- Diseño de voces personalizadas mediante descripciones textuales
- Reproducción de vistas previas de voz
- Guardado de voces diseñadas en la cuenta de ElevenLabs
- Componente React para diseñar voces desde la interfaz de usuario

## Requisitos

- Una cuenta en [ElevenLabs](https://elevenlabs.io/)
- Una API key de ElevenLabs
- Node.js y npm/yarn/bun

## Instalación

Asegúrate de tener instalada la biblioteca de ElevenLabs:

```bash
npm install @elevenlabs/elevenlabs-js
# o
yarn add @elevenlabs/elevenlabs-js
# o
bun add @elevenlabs/elevenlabs-js
```

## Configuración

Para utilizar la API de ElevenLabs, necesitas configurar tu API key. Puedes hacerlo de dos formas:

1. **Variables de entorno**: Añade tu API key en el archivo `.env`:

```
ELEVENLABS_API_KEY=tu-api-key-aquí
```

2. **Configuración directa**: Modifica el archivo `Voice.ts` para incluir tu API key:

```typescript
const elevenlabs = new ElevenLabsClient({
  apiKey: "tu-api-key-aquí"
});
```

## Uso

### Diseño de voces

```typescript
import { designVoice, playVoicePreview } from './components/elevenlabs';

// Diseñar una voz
const previews = await designVoice({
  voiceDescription: "Una voz femenina joven con acento español y tono amigable",
  text: "Hola, ¿cómo estás? Espero que estés teniendo un día maravilloso."
});

// Reproducir las vistas previas
for (const preview of previews) {
  await playVoicePreview(preview);
}
```

### Guardar una voz diseñada

```typescript
import { designVoice, saveDesignedVoice } from './components/elevenlabs';

// Diseñar una voz
const previews = await designVoice({
  voiceDescription: "Una voz masculina profunda con acento británico",
  text: "Welcome to our application. I'll be your guide through this journey."
});

// Guardar la primera vista previa
const voiceId = await saveDesignedVoice({
  preview: previews[0],
  name: "British Narrator",
  description: "Deep male voice with British accent"
});

console.log(`Voice saved with ID: ${voiceId}`);
```

### Uso del componente React

```tsx
import { VoiceDesigner } from './components/elevenlabs';

function App() {
  return (
    <div className="App">
      <h1>Voice Designer</h1>
      <VoiceDesigner />
    </div>
  );
}
```

## Estructura de archivos

- `Voice.ts`: Funciones principales para el diseño de voces
- `SaveVoice.ts`: Funciones para guardar voces diseñadas
- `VoiceDesigner.tsx`: Componente React para diseñar voces
- `VoiceDesignExample.ts`: Ejemplo de uso de la API de diseño de voces
- `index.ts`: Exportaciones del módulo

## Documentación adicional

Para más información sobre la API de ElevenLabs, consulta la [documentación oficial](https://elevenlabs.io/docs).