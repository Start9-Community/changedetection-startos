# Updating the upstream version

This package wraps the [LinuxServer changedetection.io](https://github.com/linuxserver/docker-changedetection.io) container image published to `lscr.io/linuxserver/changedetection.io`. The application inside the image is upstream [changedetection.io](https://github.com/dgtlmoon/changedetection.io).

## Determining the upstream version

- **changedetection.io application** ([dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io)) - inspect recent tags and releases, skipping prereleases rather than relying on GitHub's "Latest" badge:

  ```sh
  gh api repos/dgtlmoon/changedetection.io/tags --jq '.[].name'
  gh api repos/dgtlmoon/changedetection.io/releases --jq '.[] | {tag_name, prerelease, body}'
  ```

- **LinuxServer image** ([linuxserver/docker-changedetection.io](https://github.com/linuxserver/docker-changedetection.io)) - list its release tags, then confirm the chosen stable release exists as a multi-arch image. LinuxServer can lag the application; use the newest application version with a published LinuxServer image:

  ```sh
  gh api repos/linuxserver/docker-changedetection.io/tags --jq '.[].name'
  docker buildx imagetools inspect lscr.io/linuxserver/changedetection.io:<image tag>
  ```

  The current pin lives in `startos/manifest/index.ts` at `images.main.source.dockerBuild.buildArgs.IMAGE` (the tag after the `:` in `lscr.io/linuxserver/changedetection.io:<image tag>`); the root `Dockerfile` builds on it.

## Applying the bump

- Bump `IMAGE` in `startos/manifest/index.ts` to `lscr.io/linuxserver/changedetection.io:<new image tag>`.
- Update `version` in `startos/versions/current.ts` to `<app version>:0` for an upstream application bump. Increment the downstream revision when the LinuxServer image changes without an upstream application version change.
- Confirm the image still publishes both StartOS-supported architectures listed in `startos/manifest/index.ts`.
