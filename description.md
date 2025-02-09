### Design decisions

- **Modular Architecture**: It allows for easy extension with new integrations such as Google Maps, OpenStreetMap, etc., by adding new `Manager` and `Parser` classes, along with the necessary types for the new integrations.
- **Single Responsibility Principle**: The codebase adheres to the Single Responsibility Principle, ensuring that each class and method has a clear and focused purpose, which improves maintainability and readability.
- **Specific Error Types**: So users can handle specific errors more easily.
- **End-to-end tests**: Ensure that the system works as expected when all components are integrated (see `tests` folder).

### What I'd do given more time

- build CI and CD pipelines to automate the testing and package deployment process
- add pagination to support returning long lists of results
