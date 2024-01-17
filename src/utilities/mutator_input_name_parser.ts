export function parseInputName(inputName: string, prefix: string) {
	if (inputName.startsWith(prefix)) {
		return parseInt(inputName.slice(prefix.length));
	}
	return NaN;
}