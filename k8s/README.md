# Kubernetes Manifests

This directory contains Kubernetes deployment manifests for the Image Pry application.

## Files

- `deployment.yaml` - Deployment and Service configuration
- `ingress.yaml` - Ingress configuration for external access
- `kustomization.yaml` - Kustomize configuration for managing manifests

## Deployment

### Using kubectl directly:
```bash
kubectl apply -f k8s/
```

### Using Kustomize (recommended):
```bash
kubectl apply -k k8s/
```

## Configuration

Update the following before deploying:
- Replace `imagepry.yourdomain.com` in `ingress.yaml` with your actual domain
- Adjust resource limits in `deployment.yaml` based on your needs
- Update image tag in `kustomization.yaml` for specific versions

## Environment-specific Overlays

For different environments (dev, staging, prod), create overlay directories:
```
k8s/
├── base/
│   ├── deployment.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
└── overlays/
    ├── dev/
    ├── staging/
    └── prod/
```
