import prompt from 'prompt';

type SecretRequirementsCheckResult = { cb: true } | { cb: false, msg: string };

class SecretRequirements {

	private static checks: Array<() => SecretRequirementsCheckResult> = [
		this.prototype.checkLength,
		this.prototype.hasUpperAndLowerChars,
		this.prototype.hasSpecialChars,
		this.prototype.hasNumbers
	];

	private constructor(
		private input: string
	) {}

	static check(input: string) {
		const instance = new SecretRequirements(input);
		for (const test of this.checks) {
			const result = test.call(instance);
			if (!result.cb) {
				return result.msg;
			}
		}
		return true;
	}

	private checkLength(): SecretRequirementsCheckResult {
		if (this.input.length < 8) {
			return {cb: false, msg: 'Password must be at least 8 characters long'};
		}
		return {cb: true};
	}

	private hasUpperAndLowerChars(): SecretRequirementsCheckResult {
		if (!/[a-z]/.test(this.input) || !/[A-Z]/.test(this.input)) {
			return {cb: false, msg: 'Password must contain both upper and lower case characters'};
		}
		return {cb: true};
	}

	private hasSpecialChars(): SecretRequirementsCheckResult {
		if (!/[!@#$%^&*();,.?"'`:{}|<>^°[\]+~]/.test(this.input)) {
			return {cb: false, msg: 'Password must contain at least one special character'};
		}
		return {cb: true};
	}

	private hasNumbers(): SecretRequirementsCheckResult {
		if (!/[0-9]/.test(this.input)) {
			return {cb: false, msg: 'Password must contain at least one number'};
		}
		return {cb: true};
	}

}

export class Inputs {

	private static async askForSecret(question: string): Promise<string> {
		return (await prompt.get({properties: { passwd: {
			hidden: true,
			description: question,
			type: 'string', //@ts-ignore
			replace: '*',
			allowEmpty: true
		}}})).passwd as string;
	};

	static async newPassword() {
		const firstPasswd = await this.askForSecret('Enter a strong password:');

		const firstCheck = SecretRequirements.check(firstPasswd);
		if (firstCheck !== true) {
			console.error(firstCheck);
			return;
		}
		
		const secondPasswd = await this.askForSecret('Re-enter your password:');

		if (firstPasswd !== secondPasswd) {
			console.error('Passwords do not match');
			return;
		}

		return firstPasswd;
	}

	static async enterPassword() {
		const passwd = await this.askForSecret('Enter your password:');
		if (passwd.length === 0) {
			console.error('Password cannot be empty');
			return;
		}
		return passwd;
	}


	static async fileOverwritePrompt(file: string) {
        const overwrite = (await prompt.get({properties: { overwrite: {
            description: `File ${file} already exists. Do you want to overwrite it? (y/n)`,
            type: 'string', //@ts-ignore
            replace: '*',
            allowEmpty: true
        } }})).overwrite as string;
        if (overwrite.toLowerCase() !== 'y') {
            return false;
        }
		return true;
	}

}

