import { Box, ButtonBase, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import type { TripSceneName } from '../types';
import TripScene, { sceneLabels } from './TripScene';

const sceneNames = Object.keys(sceneLabels) as TripSceneName[];

interface ScenePickerProps {
  value: TripSceneName;
  onChange: (scene: TripSceneName) => void;
}

export default function ScenePicker({ value, onChange }: ScenePickerProps) {
  return (
    <Box>
      <Typography gutterBottom>Обложка</Typography>
      <Box
        role="radiogroup"
        aria-label="Обложка поездки"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' },
        }}
      >
        {sceneNames.map((scene) => {
          const selected = scene === value;
          return (
            <ButtonBase
              key={scene}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(scene)}
              sx={{ flexDirection: 'column', gap: 0.75, borderRadius: 2, p: 0.5 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  outline: '3px solid',
                  outlineColor: selected ? 'primary.dark' : 'transparent',
                  outlineOffset: 3,
                  opacity: selected ? 1 : 0.75,
                  transition: 'opacity 0.15s, outline-color 0.15s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <TripScene scene={scene} />
                {selected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -4,
                      bottom: -4,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: 'primary.dark',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </Box>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: selected ? 700 : 500, color: selected ? 'text.primary' : 'text.secondary' }}
              >
                {sceneLabels[scene]}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
