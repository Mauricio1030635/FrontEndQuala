export interface NuevaMonedaDto {
    idMoneda: number;
    codigoMoneda: string;
    nombreMoneda: string;
}

export interface NuevaMonedaCreateDto {
    codigoMoneda: string;
    nombreMoneda: string;
}

export interface NuevaMonedaUpdateDto {
    idMoneda: number;
    codigoMoneda: string;
    nombreMoneda: string;
}