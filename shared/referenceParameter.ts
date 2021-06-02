export interface ReferenceParameters {
	criticalRanking: string;
	failureCauseCode: string;
	failureCauseDescription: string;
	flow: SpreadedReferenceParameter;
	dischargePressure: SpreadedReferenceParameter;
	nPSHr: SpreadedReferenceParameter;
	current: SpreadedReferenceParameter;
	efficiency: SpreadedReferenceParameter;
	changeInVibration: boolean;
	amplitudeOfVibration: SpreadedReferenceParameter;
	vibrationSpikeEnergy: SpreadedReferenceParameter;
	noise: string;
	pumpTemperature: SpreadedReferenceParameter;
	bearingTemperature: SpreadedReferenceParameter;
	controlValveOpening: SpreadedReferenceParameter;
	averageDeviation: AverageDeviation;
}

export interface ExcelSheetReferenceParameter {
	"Criticality ranking": string;
	"Failure Cause code": string;
	"Possible cause of the failure (Failure Mode)": string;
	"Q (M3/hr)": string;
	"No liquid delivery": string;
	"Pd (kg/cm2)": string;
	"NPSHR (m)": string;
	"Pm (kw)/Ct (amps)": string;
	"h (%)": string;
	"Change in Vibration": string;
	"Vib. Signature, l (mm/s)": string;
	"Spike energy, gSE": string;
	"Noise, dB": string;
	"Mech. Seal leakage": string;
	"TP (0C)": string;
	"TB(oC)": string;
	TMoC: string;
	"Disc. Cntrl. Vlv. Opening (%)": string;
	"Average Deviation": string;
}

interface AverageDeviation {
	averageDeviation1: number;
	averageDeviation2: number;
}

export interface SpreadedReferenceParameter {
	indicator: Indicator | string;
	setValue: number;
	thresholdValue1: number;
	deviation1: number;
	thresholdValue2: number;
	deviation2: number;
}

export enum Indicator {
	noChange = "NC",
	increament = "(++)",
	decreament = "(--)",
	smallIncreament = "(+)",
	smallDecreament = "(-)",
	largeIncreament = "(+++)",
	largeDecreament = "(---)",
}
