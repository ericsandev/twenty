import { ActivityTargetChips } from '@/activities/components/ActivityTargetChips';
import { useActivityTargetObjectRecords } from '@/activities/hooks/useActivityTargetObjectRecords';
import { ActivityTargetInlineCellEditMode } from '@/activities/inline-cell/components/ActivityTargetInlineCellEditMode';
import { Activity } from '@/activities/types/Activity';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFieldContext } from '@/object-record/hooks/useFieldContext';
import { RecordFieldInputScope } from '@/object-record/record-field/scopes/RecordFieldInputScope';
import { RecordInlineCellContainer } from '@/object-record/record-inline-cell/components/RecordInlineCellContainer';
import { RelationPickerHotkeyScope } from '@/object-record/relation-picker/types/RelationPickerHotkeyScope';
import { IconArrowUpRight, IconPencil } from '@/ui/display/icon';

type ActivityTargetsInlineCellProps = {
  activity: Activity;
};

export const ActivityTargetsInlineCell = ({
  activity,
}: ActivityTargetsInlineCellProps) => {
  const { activityTargetObjectRecords } = useActivityTargetObjectRecords({
    activityId: activity?.id ?? '',
  });

  const { FieldContextProvider } = useFieldContext({
    objectNameSingular: CoreObjectNameSingular.Activity,
    objectRecordId: activity?.id ?? '',
    fieldMetadataName: 'activityTargets',
    fieldPosition: 2,
  });

  if (!FieldContextProvider) return null;

  return (
    <RecordFieldInputScope recordFieldInputScopeId={activity?.id ?? ''}>
      <FieldContextProvider>
        <RecordInlineCellContainer
          buttonIcon={IconPencil}
          customEditHotkeyScope={{
            scope: RelationPickerHotkeyScope.RelationPicker,
          }}
          IconLabel={IconArrowUpRight}
          editModeContent={
            <ActivityTargetInlineCellEditMode
              activity={activity}
              activityTargetObjectRecords={activityTargetObjectRecords}
            />
          }
          label="Relations"
          displayModeContent={
            <ActivityTargetChips
              activityTargetObjectRecords={activityTargetObjectRecords}
            />
          }
          isDisplayModeContentEmpty={activityTargetObjectRecords.length === 0}
        />
      </FieldContextProvider>
    </RecordFieldInputScope>
  );
};
