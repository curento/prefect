/**
 * The API format for block document references.
 * This is how nested block references come from the server.
 */
export type BlockDocumentReferenceValue = {
	$ref:
		| {
				block_document_id: string;
		  }
		| string;
};

/**
 * The UI format for block document values.
 * This is the transformed format used within the schema form.
 */
export type BlockDocumentValue = {
	blockTypeSlug: string;
	blockDocumentId: string | undefined;
};

/**
 * Type guard to check if a value is an API block document reference.
 */
export function isBlockDocumentReferenceValue(
	value: unknown,
): value is BlockDocumentReferenceValue {
	if (typeof value !== "object" || value === null || !("$ref" in value)) {
		return false;
	}
	const ref = (value as Record<string, unknown>).$ref;
	if (typeof ref === "string") {
		return true;
	}
	return (
		typeof ref === "object" &&
		ref !== null &&
		"block_document_id" in (ref as Record<string, unknown>)
	);
}

/**
 * Type guard to check if a value is a UI block document value.
 */
export function isBlockDocumentValue(
	value: unknown,
): value is BlockDocumentValue {
	return (
		typeof value === "object" &&
		value !== null &&
		"blockTypeSlug" in value &&
		typeof (value as Record<string, unknown>).blockTypeSlug === "string"
	);
}
