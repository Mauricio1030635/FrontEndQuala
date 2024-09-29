export interface NuevaEntidadDto {
    codigo: number;
    descripcion: string;
    direccion: string;
    identificacion: string;
    nombreMoneda: string;
}


export interface NuevaEntidadCreateDto {
    descripcion: string;
    direccion: string;
    identificacion: string;
    monedaId: number;
}

export interface NuevaEntidadUpdateDto {
    codigo: number;
    descripcion: string;
    direccion: string;
    identificacion: string;
    monedaId: number;
}

