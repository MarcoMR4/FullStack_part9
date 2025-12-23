
import React, { useState } from "react";
import {
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Button,
	Grid
} from "@mui/material";

type FieldType = "text" | "date" | "select";

export interface GeneralFormField {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	options?: { value: string; label: string }[]; // For select
	validate?: (value: any) => string | null; // Custom validation, returns error string or null
	initialValue?: any;
}

interface GeneralFormProps {
	fields: GeneralFormField[];
	onSubmit: (values: Record<string, any>) => void;
	onCancel: () => void;
	submitLabel?: string;
	cancelLabel?: string;
}

const GeneralForm: React.FC<GeneralFormProps> = ({
	fields,
	onSubmit,
	onCancel,
	submitLabel = "Submit",
	cancelLabel = "Cancel"
}) => {
	const initialFormState = fields.reduce((acc, field) => {
		acc[field.name] = field.initialValue ?? (field.type === "select" ? "" : "");
		return acc;
	}, {} as Record<string, any>);

	const [formValues, setFormValues] = useState<Record<string, any>>(initialFormState);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = (name: string, value: any) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validateFields = (): boolean => {
		const newErrors: Record<string, string> = {};
		fields.forEach((field) => {
			const value = formValues[field.name];
			// Standard required validation
			if (field.required && (value === undefined || value === null || value === "")) {
				newErrors[field.name] = `${field.label} is required`;
			}
			// Custom validation
			if (field.validate) {
				const customError = field.validate(value);
				if (customError) {
					newErrors[field.name] = customError;
				}
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateFields()) {
			onSubmit(formValues);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2} direction="column">
				{fields.map((field) => (
					<Grid key={field.name}>
						{field.type === "text" || field.type === "date" ? (
							<TextField
								label={field.label}
								type={field.type}
								fullWidth
								value={formValues[field.name]}
								onChange={(e) => handleChange(field.name, e.target.value)}
								InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
								error={Boolean(errors[field.name])}
								helperText={errors[field.name] || ""}
							/>
						) : field.type === "select" ? (
							<FormControl fullWidth error={Boolean(errors[field.name])}>
								<InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
								<Select
									labelId={`${field.name}-label`}
									value={formValues[field.name]}
									label={field.label}
									onChange={(e) => handleChange(field.name, e.target.value)}
								>
									{field.options?.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Select>
								{errors[field.name] && (
									<FormHelperText>{errors[field.name]}</FormHelperText>
								)}
							</FormControl>
						) : null}
					</Grid>
				))}
				<Grid container justifyContent="space-between" spacing={2} style={{ marginTop: 16 }}>
					<Grid>
						<Button
							color="secondary"
							variant="contained"
							type="button"
							onClick={onCancel}
						>
							{cancelLabel}
						</Button>
					</Grid>
					<Grid>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							{submitLabel}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default GeneralForm;
