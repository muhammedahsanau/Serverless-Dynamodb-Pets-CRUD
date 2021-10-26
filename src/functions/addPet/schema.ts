export default {
	type: 'object',
	properties: {
		id: { type: 'number' },
        name: { type: 'string' },
		tag: { type: 'string' },
	},
	required: ['name','tag'],
} as const;
