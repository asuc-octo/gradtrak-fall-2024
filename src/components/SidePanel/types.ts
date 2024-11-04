
export type RequirementStatus = 
    | 'fulfilled'
    | 'inprogress'
    | 'unfulfilled';

export interface Requirement {
    name: string;
    status: RequirementStatus;
}

export type RequirementCategoryKeys =
	// | 'engineering'
	// | 'haas'
    | 'essential'
	| 'ls'
	| 'university';

export type RequirementCategory = {
    [category in RequirementCategoryKeys]: Requirement[];
    };

// TODO: Match to actual data
export const requirements: RequirementCategory = {
    // engineering: [],
    // haas: [],
    essential: [
        { name: 'R&C Part A', status: 'unfulfilled' },
        { name: 'R&C Part B', status: 'unfulfilled' },
        { name: 'Quantitative Reasoning', status: 'unfulfilled' },
        { name: 'Foreign Language', status: 'unfulfilled' }
    ],
    ls: [
        { name: 'Arts & Literature', status: 'unfulfilled' },
        { name: 'Biological Science', status: 'unfulfilled' },
        { name: 'Historical Studies', status: 'unfulfilled' },
        { name: 'Biological', status: 'unfulfilled' },
        { name: 'International Studies', status: 'unfulfilled' },
        { name: 'Philosophy and Values', status: 'unfulfilled' },
        { name: 'Physical Science', status: 'unfulfilled' },
        { name: 'Social and Behavioral Science', status: 'unfulfilled' }
    ],
    university: [
        { name: 'Entry Level Writing', status: 'unfulfilled' },
        { name: 'American History', status: 'unfulfilled' },
        { name: 'American Institutions', status: 'unfulfilled' },
        { name: 'American Cultures', status: 'unfulfilled' },
        { name: 'R&C Part A', status: 'unfulfilled' },
        { name: 'R&C Part B', status: 'unfulfilled' },
        { name: 'Quantitative Reasoning', status: 'unfulfilled' },
        { name: 'Foreign Language', status: 'unfulfilled' }
    ]
};