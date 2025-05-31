# Publishing Guide

This guide explains how to publish the Paystack TypeScript SDK to NPM and ensure proper CI/CD workflows.

## Prerequisites

1. **NPM Account**: Ensure you have an NPM account and are logged in

   ```bash
   npm login
   ```

2. **GitHub Secrets**: Set up the following secrets in your GitHub repository:
   - `NPM_TOKEN`: Your NPM automation token (from npmjs.com)

## Publishing Methods

### Method 1: Manual Publishing

1. **Pre-publish checks**:

   ```bash
   npm run precheck
   ```

2. **Build and test**:

   ```bash
   npm run build
   npm test
   ```

3. **Version bump** (choose one):

   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   ```

4. **Publish**:

   ```bash
   npm publish
   ```

5. **Push changes**:
   ```bash
   git push && git push --tags
   ```

### Method 2: GitHub Actions (Recommended)

1. **Go to GitHub Actions tab** in your repository

2. **Run "Publish to NPM" workflow**:
   - Click "Run workflow"
   - Select version bump type (patch/minor/major)
   - Click "Run workflow"

This will automatically:

- Build the SDK
- Run tests
- Bump version
- Publish to NPM
- Create GitHub release
- Push tags

## Automated SDK Updates

The repository is configured with automated workflows:

### Daily OpenAPI Updates

- **Schedule**: Runs daily at 9 AM UTC
- **Action**: Checks for Paystack OpenAPI spec changes
- **Result**: Creates PR if changes detected

### CI/CD Pipeline

- **Trigger**: Every push/PR to main/develop
- **Action**: Tests across Node.js 16, 18, 20
- **Release**: Auto-publishes on GitHub releases

## NPM Package Information

- **Package name**: `@roarexclamation/paystack-ts-sdk`
- **Registry**: https://registry.npmjs.org/
- **Access**: Public
- **Scope**: @roarexclamation

## Verification Steps

After publishing, verify:

1. **NPM package page**: Check https://www.npmjs.com/package/@roarexclamation/paystack-ts-sdk

2. **Installation test**:

   ```bash
   mkdir test-install && cd test-install
   npm init -y
   npm install @roarexclamation/paystack-ts-sdk
   ```

3. **Import test**:
   ```typescript
   import { PaystackSDK } from "@roarexclamation/paystack-ts-sdk";
   console.log("SDK imported successfully");
   ```

## Troubleshooting

### Common Issues

1. **Authentication errors**:

   - Ensure `NPM_TOKEN` is correctly set in GitHub secrets
   - Verify token has publish permissions

2. **Version conflicts**:

   - Check if version already exists on NPM
   - Use `npm version` to properly increment

3. **Build failures**:

   - Run `npm run precheck` to identify issues
   - Ensure all dependencies are installed

4. **Test failures**:
   - Run tests locally: `npm test`
   - Check for environment-specific issues

### Getting Help

- Check GitHub Actions logs for detailed error messages
- Verify package.json configuration
- Ensure all required files are included in build

## Package Structure

When published, the package includes:

```
@roarexclamation/paystack-ts-sdk/
├── dist/           # Compiled JavaScript
├── README.md       # Documentation
├── LICENSE         # MIT License
└── package.json    # Package metadata
```

## Monitoring

- **NPM downloads**: Monitor at npmjs.com
- **GitHub releases**: Track via GitHub
- **CI/CD status**: Check GitHub Actions
- **Issues**: Monitor GitHub Issues
