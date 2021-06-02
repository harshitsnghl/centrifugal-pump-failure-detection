# Centrifugal Pump Failure Detection System



### Config Reference Data
 Head label of the reference data and their respective command line arguments

| Table Head Labels                              | Command Line Arguments |
| ---------------------------------------------- | ---------------------- |
| "Criticality ranking"                          |                        |
| "Failure Cause code"                           |                        |
| "Possible cause of the failure (Failure Mode)" |                        |
| "Q (M3/hr)"                                    | --q                    |
| "No liquid delivery"                           |                        |
| "Pd (kg/cm2)"                                  | --pd                   |
| "NPSHR (m)"                                    |                        |
| "Pm (kw)/Ct (amps)"                            | --i                    |
| "h (%)"                                        | --n                    |
| "Change in Vibration"                          |                        |
| "Vib. Signature, l (mm/s)"                     | --lemda                |
| "Spike energy, gSE"                            | ---se                  |
| "Noise, dB"                                    |                        |
| "Mech. Seal leakage"                           |                        |
| "TP (0C)"                                      | tp                     |
| "TB(oC)"                                       | tb                     |
| "TMoC"                                         |                        |
| "Disc. Cntrl. Vlv. Opening (%)"                | cv                     |
| "Average Deviation"                            |                        |

Symbols allowed to use in the table and their meaning

| Indices          | Symbols  |
| ---------------- | -------- |
| No Change        | "NC"     |
| Small Increament | "(+)"    |
| Small Decreament | "(-)"    |
| Increament       | "(++)"   |
| Decreament       | "(--)"   |
| Large Increament | "(+++)", |
| Large Decreament | "(---)", |


### Run

Command Line Arguments to provide parameter values are defines in `Config Reference Data`.

| Command Line Argument | Meaning                                                           |
| --------------------- | ----------------------------------------------------------------- |
| --file                | Specify the name or relative path of the comma seperated filefile |

*Note: In case --file option is not specified, the program will execute in default mode, otherwise in user mode*

**Default Mode**
Uses generic predefined parameter set values and threshold values

**User Mode**
Refer to example.csv to know about the format that must be used to run the program in user mode. Provide the relative file name using the --file option. (Refer to the example given below)

**Example**
- Default Mode
```bash
./cfpms-{os} --q 54.8 --pd 47 --i 18 --n 53 --lemda 4.5 --se 2.5 --cv 45 
```
- User Mode
```bash
./cfpms-{os} --q 54.8 --pd 47 --i 18 --n 53 --lemda 4.5 --se 2.5 --cv 45 --file deviation_data.csv
```






