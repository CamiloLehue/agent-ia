import React from 'react';
import Button from './Button';

const ButtonExample: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">Variantes de botones</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Botón Solid (Default)</Button>
          <Button variant="transparent">Botón Transparent</Button>
          <Button variant="border">Botón Border</Button>
          <Button variant="ghost">Botón Ghost</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold">Tamaños</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm">Botón Pequeño</Button>
          <Button size="md">Botón Mediano</Button>
          <Button size="lg">Botón Grande</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold">Ancho completo</h2>
        <Button fullWidth>Botón de ancho completo</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold">Estado deshabilitado</h2>
        <div className="flex flex-wrap gap-2">
          <Button disabled>Botón Solid Deshabilitado</Button>
          <Button variant="transparent" disabled>Transparent Deshabilitado</Button>
          <Button variant="border" disabled>Border Deshabilitado</Button>
          <Button variant="ghost" disabled>Ghost Deshabilitado</Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;