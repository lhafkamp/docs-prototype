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

export function changeProviderChoice(provider) {
	return {
		type: 'CHANGE_PROVIDER_CHOICE',
		currentProviderChoice: provider
	}
}

export function changeEditionChoice(edition) {
	return {
		type: 'CHANGE_EDITION_CHOICE',
		currentEditionChoice: edition
	}
}
