import React, { useState, useEffect } from "react";
import axios from "axios";

import { 
	Select, 
	MenuItem, 
	InputLabel, 
	FormControl, 
	Box,
	SelectChangeEvent
} from "@mui/material";
import GeneralForm, { GeneralFormField } from "./common/generalForm";
import { Diagnosis, Patient } from "../types/patients";
import { apiBaseUrl } from "../constants";
import { healthCheckRatingOptions } from "../helpers/patients";

const ENTRY_TYPES = [
	{ value: "HealthCheck", label: "Health Check" },
	{ value: "Hospital", label: "Hospital" },
	{ value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const getFieldsForType = (type: string, diagnosisOptions: { value: string; label: string }[]): GeneralFormField[] => {
	const commonFields: GeneralFormField[] = [
		{
			name: "date",
			label: "Date",
			type: "date",
			required: true,
			validate: (value) => !/^\d{4}-\d{2}-\d{2}$/.test(value || "") ? "Date must be in YYYY-MM-DD format" : null,
		},
		{
			name: "specialist",
			label: "Specialist",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Description",
			type: "text",
			required: true,
		},
		{
			name: "diagnosisCodes",
			label: "Diagnosis Codes",
			type: "select",
			required: true,
			options: diagnosisOptions,
			initialValue: [],
			validate: (value) => (Array.isArray(value) && value.length > 0 ? null : "Select at least one code"),
		},
	];

	if (type === "HealthCheck") {
		return [
			...commonFields,
			{
				name: "healthCheckRating",
				label: "Health Check Rating",
				type: "select",
				required: true,
				options: healthCheckRatingOptions,
			},
		];
	}
	if (type === "Hospital") {
		return [
			...commonFields,
			{
				name: "dischargeDate",
				label: "Discharge Date",
				type: "date",
				required: true,
				validate: (value) => !/^\d{4}-\d{2}-\d{2}$/.test(value || "") ? "Date must be in YYYY-MM-DD format" : null,
			},
			{
				name: "dischargeCriteria",
				label: "Discharge Criteria",
				type: "text",
				required: true,
			},
		];
	}
	if (type === "OccupationalHealthcare") {
		return [
			...commonFields,
			{
				name: "employerName",
				label: "Employer Name",
				type: "text",
				required: true,
			},
			{
				name: "sickLeaveStartDate",
				label: "Sick Leave Start Date",
				type: "date",
				required: false,
				validate: (value) => value && !/^\d{4}-\d{2}-\d{2}$/.test(value) ? "Date must be in YYYY-MM-DD format" : null,
			},
			{
				name: "sickLeaveEndDate",
				label: "Sick Leave End Date",
				type: "date",
				required: false,
				validate: (value) => value && !/^\d{4}-\d{2}-\d{2}$/.test(value) ? "Date must be in YYYY-MM-DD format" : null,
			},
		];
	}
	return commonFields;
};


const AddPatientEntryForm: React.FC<{patientId: string, onCreatePatientEntry: (patient: Patient) => void}> = ({patientId, onCreatePatientEntry}) => {
	const [entryType, setEntryType] = useState<string>("HealthCheck");
	const [formKey, setFormKey] = useState<number>(0); // For resetting form
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const response = await fetch(`${apiBaseUrl}/diagnoses`);
			const diagnosesData = await response.json();
			setDiagnoses(diagnosesData);
		};
		fetchDiagnoses();
	}, []);

	const diagnosisOptions = diagnoses.map((diagnosis) => ({
		value: diagnosis.code,
		label: diagnosis.name,
	}));

	const resetForm = () => {
		setFormKey((prev) => prev + 1); // Reset form
	};

	const handleTypeChange = (e: SelectChangeEvent<string>) => {
		setEntryType(e.target.value as string);
		resetForm();
	};

	const handleSubmit = async (values: Record<string, any>) => {
		// Transform diagnosisCodes to array if not already
		const baseEntry = {
			date: values.date,
			specialist: values.specialist,
			description: values.description,
			diagnosisCodes: values.diagnosisCodes,
		};

		let newEntry: any = { ...baseEntry, type: entryType };

		switch (entryType) {
			case "HealthCheck":
				newEntry = {
					...newEntry,
					healthCheckRating: Number(values.healthCheckRating),
				};
				break;
			case "Hospital":
				newEntry = {
					...newEntry,
					discharge: {
						date: values.dischargeDate,
						criteria: values.dischargeCriteria,
					},
				};
				break;
			case "OccupationalHealthcare":
				newEntry = {
					...newEntry,
					employerName: values.employerName,
				};
				if (values.sickLeaveStartDate && values.sickLeaveEndDate) {
					newEntry.sickLeave = {
						startDate: values.sickLeaveStartDate,
						endDate: values.sickLeaveEndDate,
					};
				}
				break;
			default:
				break;
		}

		try {
			const response = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);
			console.log("New entry added:", response.data);
			resetForm();
			onCreatePatientEntry(response.data);
		} catch (error) {
			console.error("Error adding entry:", error);
		}
	};

	const handleCancel = () => {
		resetForm();
	};

	const fields: GeneralFormField[] = getFieldsForType(entryType, diagnosisOptions);

	return (
		<Box border={1} borderRadius={2} borderColor="grey.400" p={2} mb={2}>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="entry-type-label">Entry Type</InputLabel>
				<Select
					labelId="entry-type-label"
					value={entryType}
					label="Entry Type"
					onChange={handleTypeChange}
				>
					{ENTRY_TYPES.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<GeneralForm
				key={formKey}
				fields={fields}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				submitLabel="Add Entry"
				cancelLabel="Cancel"
			/>
		</Box>
	);
};

export default AddPatientEntryForm;
