# MDFe Edit Page Implementation Guide

## Objective

Implement MDFe edit functionality by refactoring the existing creation form in `/app/(private)/mdfe/new/page.tsx` to create a reusable multi-step form component that handles both creation and editing modes.

## Technical Requirements

### 1. Architecture Overview

- Create a shared `MdfeFormWizard` component that centralizes form logic
- Support both `create` and `edit` modes through props
- Maintain all existing form steps and validation
- Preserve current user experience and workflow

### 2. Current Form Steps to Preserve

1. **Dados** - Basic MDFe information
2. **Emitente** - Issuer information
3. **Rodoviario** - Road transport details
4. **Aquaviario** - Water transport details
5. **Informações dos Documentos** - Document information
6. **Totalizadores** - Totals and calculations
7. **Informações adicionais** - Additional information

### 3. Implementation Plan

#### Phase 1: Create Shared Form Component

```typescript
// components/mdfe/MdfeFormWizard.tsx
interface MdfeFormWizardProps {
  mode: "create" | "edit";
  initialData?: MdfeDocument;
  onComplete: (data: any) => Promise<void>;
  onCancel: () => void;
}
```

#### Phase 2: Data Loading Strategy

- Use `getMdfeById` or `getMdfeByObjectId` for edit mode
- Implement proper loading states and error handling
- Pre-populate form fields with existing data

#### Phase 3: Form Submission Logic

- **Create Mode**: Use existing `createMdfe` action
- **Edit Mode**: Use `updateMdfe` or `updateMdfeByObjectId` actions
- Handle success/error states consistently

#### Phase 4: Update Existing Pages

- Refactor `/mdfe/new/page.tsx` to use `MdfeFormWizard`
- Replace `/mdfe/edit/[id]/page.tsx` content with `MdfeFormWizard`

## Technical Implementation Details

### 1. Shared Component Structure

```typescript
// Key props and state management
const MdfeFormWizard = ({ mode, initialData, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData || defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Form step navigation logic
  // Data validation and submission
  // Error handling
};
```

### 2. Data Loading for Edit Mode

```typescript
// In edit page
const EditMdfePage = ({ params }: { params: { id: string } }) => {
  const [mdfeData, setMdfeData] = useState<MdfeDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMdfeData(params.id);
  }, [params.id]);
};
```

### 3. Form Submission Handler

```typescript
const handleFormComplete = async (data: any) => {
  if (mode === "create") {
    return await createMdfe(data);
  } else {
    return await updateMdfeByObjectId(initialData._id, data);
  }
};
```

## File Structure Changes

### New Files

- `components/mdfe/MdfeFormWizard.tsx` - Shared form component
- `types/MdfeFormTypes.ts` - Form-specific type definitions

### Modified Files

- `app/(private)/mdfe/new/page.tsx` - Use shared component
- `app/(private)/mdfe/edit/[id]/page.tsx` - Complete rewrite using shared component

## Validation and Error Handling

### 1. Form Validation

- Preserve all existing validation rules
- Implement consistent error messaging
- Handle both client-side and server-side validation

### 2. Error States

- Network errors during data loading
- Validation errors during form submission
- Authorization errors for protected operations

### 3. Loading States

- Initial data loading for edit mode
- Form submission loading states
- Step navigation loading indicators

## User Experience Considerations

### 1. Navigation

- Preserve existing step-by-step navigation
- Add proper breadcrumb indicators
- Handle unsaved changes warnings

### 2. Data Persistence

- Auto-save draft functionality
- Restore form state on page refresh
- Handle browser back/forward navigation

### 3. Accessibility

- Maintain keyboard navigation
- Proper ARIA labels and roles
- Screen reader compatibility

## Testing Strategy

### 1. Unit Tests

- Test form component in both modes
- Validate data transformation logic
- Test error handling scenarios

### 2. Integration Tests

- Test complete create workflow
- Test complete edit workflow
- Test form state management

### 3. E2E Tests

- User journey for MDFe creation
- User journey for MDFe editing
- Error scenarios and recovery

## Performance Considerations

### 1. Code Splitting

- Dynamic imports for form steps
- Lazy loading of heavy components
- Optimize bundle size

### 2. Data Loading

- Implement proper caching strategies
- Use React Query for server state management
- Optimize API calls

### 3. Form Performance

- Debounce form field updates
- Minimize unnecessary re-renders
- Optimize form validation

## Security Considerations

### 1. Data Validation

- Server-side validation for all inputs
- Sanitize user input data
- Validate user permissions

### 2. Authorization

- Verify edit permissions for specific MDFe
- Implement proper tenant isolation
- Validate user access rights

## Migration Strategy

### 1. Backward Compatibility

- Ensure existing URLs continue to work
- Maintain API contract compatibility
- Preserve existing user bookmarks

### 2. Rollout Plan

- Implement feature flag for gradual rollout
- Monitor for regressions
- Have rollback strategy ready

## Success Criteria

### 1. Functional Requirements

- ✅ Edit form works identically to create form
- ✅ All existing form steps and validation preserved
- ✅ Proper data loading and error handling
- ✅ Consistent user experience

### 2. Technical Requirements

- ✅ Code duplication eliminated
- ✅ Maintainable and testable architecture
- ✅ Performance metrics maintained or improved
- ✅ Security standards upheld

### 3. User Experience

- ✅ Seamless transition between create/edit modes
- ✅ Intuitive navigation and feedback
- ✅ Proper loading and error states
- ✅ Accessibility standards met

## Next Steps

1. **Create** `MdfeFormWizard` component with mode support
2. **Implement** data loading logic for edit mode
3. **Update** both create and edit pages to use shared component
4. **Test** thoroughly in both modes
5. **Deploy** with feature flag for gradual rollout
6. **Monitor** and optimize based on user feedback

---

## Code Examples

### MdfeFormWizard Component Interface

```typescript
interface MdfeFormWizardProps {
  mode: "create" | "edit";
  initialData?: Partial<MdfeDocument>;
  onComplete: (data: any) => Promise<{ success: boolean; message?: string }>;
  onCancel: () => void;
  className?: string;
}

interface MdfeFormWizardState {
  currentStep: number;
  formData: Record<string, any>;
  isLoading: boolean;
  hasChanges: boolean;
  errors: Record<string, string>;
}
```

### Usage in Edit Page

```typescript
export default function EditMdfePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [mdfeData, setMdfeData] = useState<MdfeDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = async (data: any) => {
    const result = await updateMdfeByObjectId(params.id, data);
    if (result.success) {
      router.push("/mdfe");
    }
    return result;
  };

  return (
    <MdfeFormWizard
      mode="edit"
      initialData={mdfeData}
      onComplete={handleComplete}
      onCancel={() => router.push("/mdfe")}
    />
  );
}
```

This implementation guide provides a comprehensive roadmap for creating a maintainable, reusable form system that eliminates code duplication while preserving all existing functionality.
