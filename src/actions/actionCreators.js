export function changeLanguage(language) {
	return {
		type: 'CHANGE_LANGUAGE',
		currentLanguage: language
	}
}

export function changeIntegration(integration) {
	return {
		type: 'CHANGE_INTEGRATION',
		currentIntegration: integration
	}
}
