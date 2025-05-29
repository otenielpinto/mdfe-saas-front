# MDFe Form Page - Dual Mode Implementation

## Overview

The MDFe form page at `/app/(private)/mdfe/new/page.tsx` now supports both creation and editing modes through URL parameter detection. This implementation provides a seamless experience for users to either create new MDFe documents or edit existing ones.

## Features Implemented

### 1. Dual Mode Detection

- **Creation Mode**: `/mdfe/new` - Creates a new MDFe document
- **Edit Mode**: `/mdfe/new?id=123` - Loads and edits an existing MDFe document
- Automatic mode detection based on the presence of the `id` parameter in searchParams

### 2. Data Loading Strategy

- **Edit Mode**: Loads existing MDFe data using `getMdfeById()` action
- **Creation Mode**: Loads default configuration and emitente data
- Proper error handling for non-existent MDFe documents
- Automatic fallback to creation mode if MDFe is not found

### 3. User Interface Enhancements

- Dynamic page title: "Emitir novo MDF-e" vs "Editar MDF-e"
- Visual edit mode indicator with icon and badge
- Context-aware button labels: "Emitir/Atualizar" and "Salvar Rascunho/Salvar Alterações"
- Separate loading states for configuration and MDFe data

### 4. State Management

- TypeScript interface `MdfeFormData` for type safety
- Proper date field conversion for existing data
- Preservation of multi-step form functionality
- Form data persistence across navigation

### 5. Actions Integration

- Utilizes existing `getMdfeById()` function from `/actions/actMdfeEnvio.tsx`
- Conditional use of `createMdfe()` vs `updateMdfe()` based on mode
- Consistent error handling and user feedback
- Proper tenant and user validation

### 6. Error Handling

- Comprehensive try-catch blocks for all async operations
- User-friendly toast notifications for all scenarios
- Graceful degradation when data loading fails
- Validation for required fields and documents

## Technical Implementation

### URL Parameter Reading

```typescript
const searchParams = useSearchParams();
const editId = searchParams.get("id");
const isEditMode = Boolean(editId);
```

### Conditional Data Loading

```typescript
useEffect(() => {
  const loadData = async () => {
    if (isEditMode && editId) {
      await loadMdfeForEdit(editId);
    } else {
      await loadDefaultConfig();
    }
  };
  loadData();
}, [editId, isEditMode]);
```

### Dynamic Form Submission

The form now intelligently handles both creation and updates:

- Edit mode: Uses `updateMdfe()` with the existing document ID
- Creation mode: Uses `createMdfe()` to generate a new document
- Proper status management ("RASCUNHO" for drafts, "CRIADO" for emitted)

## Usage Examples

### Creating a New MDFe

```
/mdfe/new
```

- Loads default configuration
- Generates new UUID for document
- Populates form with default emitente data

### Editing an Existing MDFe

```
/mdfe/new?id=abc123
```

- Loads existing MDFe data by ID
- Populates all form fields with existing values
- Enables update functionality

## Benefits

1. **Unified Interface**: Single page handles both creation and editing
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Error Resilience**: Comprehensive error handling and user feedback
4. **Performance**: Optimized loading states and minimal re-renders
5. **User Experience**: Clear mode indicators and contextual actions
6. **Maintainability**: Clean code structure following Next.js best practices

## Future Enhancements

- Add confirmation dialogs for destructive actions
- Implement auto-save functionality for drafts
- Add breadcrumb navigation with mode indication
- Support for copying existing MDFe documents
- Enhanced validation with Zod schemas
