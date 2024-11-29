# Annotator

A react app for image annotation

## Dev Deps

- On change image
  -- Track all images with annotation dada

- Setup infere

1. Project Table

```sql
CREATE TABLE Projects (
    project_id INTEGER PRIMARY KEY,
    project_name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

2. Label Table

```sql
CREATE TABLE Labels (
    label_id INTEGER PRIMARY KEY,
    project_id INTEGER,
    label_name TEXT NOT NULL,
    color_hex VARCHAR(7),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);
```

3. Image Table

```sql
CREATE TABLE Images (
    image_id INTEGER PRIMARY KEY,
    project_id INTEGER,
    file_path TEXT NOT NULL,
    filename TEXT NOT NULL,
    image_width INTEGER,
    image_height INTEGER,
    imported_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);
```

4. Annotation Table

```sql
CREATE TABLE Annotations (
    annotation_id INTEGER PRIMARY KEY,
    image_id INTEGER,
    label_id INTEGER,
    x_min FLOAT NOT NULL,      # Top-left x coordinate of bounding box
    y_min FLOAT NOT NULL,      # Top-left y coordinate of bounding box
    x_max FLOAT NOT NULL,      # Bottom-right x coordinate of bounding box
    y_max FLOAT NOT NULL,      # Bottom-right y coordinate of bounding box
    confidence FLOAT DEFAULT 1.0,  # Useful if later integrated with ML models
    annotated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES Images(image_id),
    FOREIGN KEY (label_id) REFERENCES Labels(label_id)
);
```

5. Export Log Table

```sql
CREATE TABLE ExportLogs (
    export_id INTEGER PRIMARY KEY,
    project_id INTEGER,
    export_format TEXT NOT NULL,  # 'PASCAL_VOC' or 'COCO'
    exported_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_images INTEGER,
    total_annotations INTEGER,
    export_file_path TEXT,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);
```

Database Design Rationale:

1. Normalized structure to avoid data redundancy
2. Foreign key relationships to maintain data integrity
3. Timestamp fields for tracking creation and modification
4. Flexible schema to support both Pascal VOC and COCO formats
5. Separate tables for Projects, Labels, Images, and Annotations

Sample Workflow Demonstration:

1. Create Project

```sql
INSERT INTO Projects (project_name, description)
VALUES ('Car Detection', 'Identifying cars in urban scenes');
```

2. Create Labels

```sql
INSERT INTO Labels (project_id, label_name, color_hex)
VALUES
(1, 'sedan', '#FF0000'),
(1, 'truck', '#00FF00'),
(1, 'motorcycle', '#0000FF');
```

3. Import Image

```sql
INSERT INTO Images (project_id, file_path, filename, image_width, image_height)
VALUES (1, '/path/to/images/city_street.jpg', 'city_street.jpg', 1920, 1080);
```

4. Create Annotation

```sql
INSERT INTO Annotations (image_id, label_id, x_min, y_min, x_max, y_max)
VALUES (1, 1, 0.2, 0.3, 0.4, 0.5);  # Coordinates are typically normalized
```

Export Workflow:

```sql
INSERT INTO ExportLogs (project_id, export_format, total_images, total_annotations, export_file_path)
VALUES (1, 'PASCAL_VOC', 50, 150, '/exports/project1_pascal_voc.xml');
```

Key Benefits of This Design:

- Supports multiple projects
- Flexible label creation
- Tracks annotations across images
- Maintains export history
- Supports both Pascal VOC and COCO export formats
- Provides timestamp tracking

Potential Additional Features:

- User authentication table
- Annotation status tracking
- Bulk import/export capabilities

Implementation Considerations:

- Use SQLite for local applications
- Use PostgreSQL or MySQL for multi-user, server-based applications
- Consider ORM (Object-Relational Mapping) for easier database interactions

## TODOS

- Generate COCO annotation file structure
- Implement polygon draw with react-konva
- How Short way to filter out items with the same id's in an array

## Removed Packages

"axios": "^1.7.2",
"date-fns": "^3.6.0",
"file-saver": "^2.0.5",
"uuid": "^11.0.3"
