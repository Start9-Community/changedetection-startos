# Updating the upstream version

This package wraps the [LinuxServer changedetection.io](https://github.com/linuxserver/docker-changedetection.io) container image published to `lscr.io/linuxserver/changedetection.io`. The application inside the image is upstream [changedetection.io](https://github.com/dgtlmoon/changedetection.io).

## Determining the upstream version

- **changedetection.io application** ([dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io)) - fetch the latest stable release tag:

  ```sh
  gh release view -R dgtlmoon/changedetection.io --json tagName -q .tagName
  ```

- **LinuxServer image** ([linuxserver/docker-changedetection.io](https://github.com/linuxserver/docker-changedetection.io)) - confirm the latest LinuxServer release tag exists as a multi-arch image tag:

  ```sh
  docker buildx imagetools inspect lscr.io/linuxserver/changedetection.io:<image tag>
  ```

  The current pin lives in `startos/manifest/index.ts` at `images.main.source.dockerTag` (the tag after the `:` in `lscr.io/linuxserver/changedetection.io:<image tag>`).

## Applying the bump

- Bump `dockerTag` in `startos/manifest/index.ts` to `lscr.io/linuxserver/changedetection.io:<new image tag>`.
- Update `version` in `startos/versions/current.ts` to `<app version>:0` for an upstream application bump. Increment the downstream revision when the LinuxServer image changes without an upstream application version change.
- Confirm the image still publishes both StartOS-supported architectures listed in `startos/manifest/index.ts`.
